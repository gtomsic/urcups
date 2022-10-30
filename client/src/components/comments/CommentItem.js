import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../apis/axios'
import { selectUser } from '../../store/features/user/userSlice'
import Avatar from '../Avatar'

const fetchUser = _.memoize(async (token, user_id) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   }
   const response = await axios.get(`/api/users/user/${user_id}`, config)
   return response.data
})

const CommentItem = ({ comment }) => {
   const isFetch = useRef(false)
   const dispatch = useDispatch()
   const [profile, setProfile] = useState({})
   const { user } = useSelector(selectUser)
   useEffect(() => {
      if (isFetch.current === false) {
         const getUserProfile = async () => {
            const res = await fetchUser(user?.token, comment.user_id)
            setProfile(res)
         }
         getUserProfile()
      }
      return () => {
         isFetch.current = true
      }
   }, [comment])
   return (
      <div className='flex gap-4'>
         <div>
            <Avatar image={profile?.thumbnail} isOnline={profile?.isOnline} />
         </div>
         <div className='relative flex-1 flex flex-col bg-dark p-3 rounded-md  before:content-[""] before:w-4 before:h-4 before:bg-dark before:absolute before:left-[-6px] before:origin-center before:rotate-45 before:top-3'>
            <div className='flex justify-between'>
               <h5 className='text-light'>{profile?.username}</h5>

               <small className='text-gray'>
                  {moment(comment?.createdAt).fromNow()}
               </small>
            </div>
            <p className='text-light'>{comment?.body}</p>
         </div>
      </div>
   )
}

export default CommentItem
