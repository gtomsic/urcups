import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComments } from '../../store/features/comments/commentsSlice'
import { serviceUpdateComments } from '../../store/features/comments/serviceComments'
import { fetchUser } from '../../store/features/user/userService'
import { selectUser } from '../../store/features/user/userSlice'
import Avatar from '../Avatar'

const CommentItem = ({ comment, getComments }) => {
   const isFetch = useRef(false)
   const reduxDispatch = useDispatch()
   const [body, setBody] = useState(comment?.body)
   const [isEdit, setIsEdit] = useState(false)
   const [profile, setProfile] = useState({})
   const { user } = useSelector(selectUser)
   useEffect(() => {
      if (isFetch.current === false) {
         const getUserProfile = async () => {
            const res = await fetchUser(comment.user_id)
            setProfile(res)
         }
         getUserProfile()
      }
      return () => {
         isFetch.current = true
      }
   }, [comment])

   const onEditHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsEdit(true)
      setBody(comment.body)
   }
   const onSaveHandler = async (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsEdit(false)
      if (!Boolean(body.trim())) return
      const response = await serviceUpdateComments({
         id: comment?.id,
         body,
         token: user?.token,
      })
      getComments()
      setBody(response.body)
   }
   const onDeleteHandler = async (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsEdit(false)
      reduxDispatch(
         deleteComments({
            id: comment?.id,
            token: user?.token,
         })
      )
   }
   return (
      <div className='flex gap-4'>
         <div>
            <Avatar image={profile?.thumbnail} isOnline={profile?.isOnline} />
         </div>
         <div className='relative flex-1 flex flex-col bg-darker  p-3 rounded-md  before:content-[""] before:w-4 before:h-4 before:bg-darker before:absolute before:left-[-6px] before:origin-center before:rotate-45 before:top-3'>
            <div className='flex justify-between'>
               <h5 className='text-light'>{profile?.username}</h5>

               <small className='text-gray'>
                  {moment(comment?.createdAt).fromNow()}
               </small>
            </div>
            <div className='text-light flex items-center my-2'>
               {!isEdit ? (
                  <p>{body}</p>
               ) : (
                  <input
                     value={body}
                     onChange={(e) => setBody(e.target.value)}
                     type='text'
                     className='bg-white rounded-md p-3 text-dark w-full'
                  />
               )}
            </div>
            {user?.id !== comment?.user_id || !user?.id ? null : (
               <div className='flex gap-2 items-center'>
                  <span
                     onClick={onDeleteHandler}
                     className='text-danger px-3 py-1 rounded-md  hover:text-secondary duration-300 cursor-pointer'
                  >
                     Delete
                  </span>
                  {!isEdit ? (
                     <span
                        onClick={onEditHandler}
                        className='bg-gradient-to-tr text-warning px-3 py-1 rounded-md hover:text-primary hover:bg-opacity-30 duration-300 cursor-pointer'
                     >
                        Edit
                     </span>
                  ) : (
                     <>
                        <span
                           onClick={() => setIsEdit(false)}
                           className='bg-gradient-to-tr text-warning px-3 py-1 rounded-md hover:text-primary hover:bg-opacity-30 duration-300 cursor-pointer'
                        >
                           Cancel
                        </span>
                        <span
                           onClick={onSaveHandler}
                           className='bg-gradient-to-tr text-secondary px-3 py-1 rounded-md hover:text-primary hover:bg-opacity-30 duration-300 cursor-pointer'
                        >
                           Save
                        </span>
                     </>
                  )}
               </div>
            )}
         </div>
      </div>
   )
}

export default CommentItem
