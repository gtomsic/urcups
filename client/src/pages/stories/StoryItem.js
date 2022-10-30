import React, { useEffect, useRef, useState } from 'react'
import { FaRegHeart, FaHeart, FaRegCommentDots } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import {
   serviceAddRemoveLoves,
   serviceCheckLove,
   serviceCountLoves,
} from '../../store/features/loves/serviceLove'
import { selectUser } from '../../store/features/user/userSlice'

const StoryItem = ({ story }) => {
   const isFetch = useRef(false)
   const [loves, setLoves] = useState(0)
   const [comments, setComments] = useState(0)
   const [isLove, setIsLove] = useState(false)
   const { user } = useSelector(selectUser)
   const newBody = story?.body?.split('<br/>').join('\n')
   useEffect(() => {
      if (isFetch.current === false) {
         const fetchingLove = async () => {
            const countLoves = await serviceCountLoves({ story_id: story.id })
            setLoves(countLoves)
            if (user?.id) {
               const response = await serviceCheckLove({
                  story_id: story.id,
                  token: user?.token,
               })
               setIsLove(response)
            }
         }
         fetchingLove()
      }
      return () => {
         isFetch.current = true
      }
   }, [user])
   const loveClickHandler = async (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (!user?.id) return
      const response = await serviceAddRemoveLoves({
         story_id: story.id,
         token: user?.token,
      })
      const checkLove = await serviceCheckLove({
         story_id: story.id,
         token: user?.token,
      })
      setIsLove(checkLove)
      setLoves(response)
   }
   return (
      <div className='relative flex flex-col rounded-3xl p-4 bg-gradient-to-b from-secondary text-light cursor-pointer'>
         {!story?.image ? (
            <div className='flex justify-center items-center rounded-2xl h-[300px] bg-gradient-to-tr from-secondary to-primary text-white'>
               <h3>No Image</h3>
            </div>
         ) : (
            <div
               style={{
                  backgroundImage: `url(${story?.image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
               }}
               className='rounded-2xl h-[300px]'
            ></div>
         )}
         <div className='mt-3 min-h-[100px]'>
            <h3>{story?.title}</h3>
            <p>
               {story?.body?.split('').length > 60 ? (
                  <>
                     {newBody?.split('').splice(0, 60).join('')}
                     <span className='text-secondary'> ...</span>
                  </>
               ) : (
                  story?.body
               )}
            </p>
         </div>
         {/* Interactions Buttons */}
         <div className='flex gap-3 mt-2'>
            <div
               onClick={(e) => loveClickHandler(e)}
               className='flex gap-2 items-center p-2 rounded-md hover:bg-secondary hover:bg-opacity-30 duration-300 cursor-pointer'
            >
               <span>Loves</span>
               {!isLove ? (
                  <span className='text-danger'>
                     <FaRegHeart />
                  </span>
               ) : (
                  <span className='text-danger'>
                     <FaHeart />
                  </span>
               )}
               <small>{loves}</small>
            </div>
            <div className='flex gap-2 items-center p-2 rounded-md hover:bg-secondary hover:bg-opacity-30 duration-300 cursor-pointer'>
               <span>Comments</span>
               <span className='text-secondary'>
                  <FaRegCommentDots />
               </span>
               <small>{comments}</small>
            </div>
         </div>
      </div>
   )
}

export default StoryItem
