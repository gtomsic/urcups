import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FaRegHeart, FaHeart, FaRegCommentDots } from 'react-icons/fa'
import { MdOutlineDeleteOutline, MdEditNote } from 'react-icons/md'

import Loader from '../components/loader/Loader'
import { getStoryById, selectStory } from '../store/features/stories/storySlice'
import { selectUser } from '../store/features/user/userSlice'
import {
   serviceAddRemoveLoves,
   serviceCheckLove,
   serviceCountLoves,
} from '../store/features/loves/serviceLove'

const StoryPage = () => {
   const isFetch = useRef(false)
   const params = useParams()
   const dispatch = useDispatch()
   const [loves, setLoves] = useState(0)
   const [comments, setComments] = useState(0)
   const [isLove, setIsLove] = useState(0)
   const { user } = useSelector(selectUser)
   const { story, storyIsLoading } = useSelector(selectStory)
   const url = useSelector((state) => state.url)
   useEffect(() => {
      dispatch(getStoryById(params.story_id))
   }, [params])
   useEffect(() => {
      if (user?.id && isFetch.current === true) {
         const fetchStory = async () => {
            const fetchLoves = await serviceCountLoves({ story_id: story.id })
            const checkLove = await serviceCheckLove({
               story_id: story.id,
               token: user?.token,
            })
            setLoves(fetchLoves)
            setIsLove(checkLove)
         }
         fetchStory()
      }
      return () => {
         isFetch.current = true
      }
   }, [story])
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
      <div className='relative'>
         {!storyIsLoading ? null : <Loader>Please wait...</Loader>}
         <img src={url + story?.image} alt={story?.id} />
         <div className='p-3 pt-3 text-light'>
            <h3>{story?.title}</h3>
            <p>{story?.body}</p>
            <div className='flex justify-between'>
               <div className='flex gap-3 mt-2'>
                  <div
                     onClick={loveClickHandler}
                     className='flex gap-2 items-center p-2 rounded-md hover:bg-secondary hover:bg-opacity-30 duration-300 cursor-pointer'
                  >
                     <span className='hidden md:block'>Loves</span>
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
                     <span className='hidden md:block'>Comments</span>
                     <span className='text-secondary'>
                        <FaRegCommentDots />
                     </span>
                     <small>{comments}</small>
                  </div>
               </div>
               {story?.user_id !== user?.id ? null : (
                  <div className='flex gap-3 mt-2'>
                     <div className='flex gap-2 items-center p-2 rounded-md hover:bg-secondary hover:bg-opacity-30 duration-300 cursor-pointer'>
                        <span className='text-warning'>
                           <MdEditNote />
                        </span>
                        <span className='hidden md:block'>Edit</span>
                     </div>
                     <div className='flex gap-2 items-center p-2 rounded-md hover:bg-secondary hover:bg-opacity-30 duration-300 cursor-pointer'>
                        <span className='text-danger'>
                           <MdOutlineDeleteOutline />
                        </span>
                        <span className='hidden md:block'>Delete</span>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default StoryPage
