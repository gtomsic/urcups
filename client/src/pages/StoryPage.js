import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FaRegHeart, FaHeart, FaRegCommentDots } from 'react-icons/fa'
import { MdOutlineDeleteOutline, MdEditNote } from 'react-icons/md'

import Loader from '../components/loader/Loader'
import {
   deleteStory,
   getStoryById,
   selectStory,
} from '../store/features/stories/storySlice'
import { selectUser } from '../store/features/user/userSlice'
import {
   serviceAddRemoveLoves,
   serviceCheckLove,
   serviceCountLoves,
} from '../store/features/loves/serviceLove'
import Modal from '../components/Modal'

import StoryEdit from './stories/StoryEdit'
import Comments from '../components/comments/Comments'
import { AiOutlineClose } from 'react-icons/ai'

const StoryPage = () => {
   const scrollView = useRef(null)
   const isFetch = useRef(false)
   const params = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isOpen, setIsOpen] = useState(false)
   const [isCommentOpen, setIsCommentOpen] = useState(false)
   const [loves, setLoves] = useState(0)
   const { story, storyIsLoading } = useSelector(selectStory)
   const [comments, setComments] = useState(0)
   const [isLove, setIsLove] = useState(0)
   const { user } = useSelector(selectUser)
   const url = useSelector((state) => state.url)
   useEffect(() => {
      dispatch(getStoryById(params.story_id))
   }, [params])
   useEffect(() => {
      if (isFetch.current === true) {
         const fetchStory = async () => {
            const fetchLoves = await serviceCountLoves({ story_id: story.id })
            scrollView.current.scrollIntoView()
            setLoves(fetchLoves)
            if (user?.id) {
               const checkLove = await serviceCheckLove({
                  story_id: story.id,
                  token: user?.token,
               })
               setIsLove(checkLove)
            }
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
   const onDeleteHandler = async (e) => {
      e.preventDefault()
      e.stopPropagation()
      const data = { story_id: story.id, token: user?.token }
      await dispatch(deleteStory(data))
      navigate(-1)
   }
   return (
      <div className='relative'>
         <div ref={scrollView} />

         {!storyIsLoading ? null : (
            <Modal>
               <Loader>Please wait...</Loader>
            </Modal>
         )}
         <img
            src={url + story?.image}
            alt={story?.id}
            className='block md:float-left md:mx-4'
         />
         <div className='px-3 mt-5 md:mt-0 text-light'>
            <h3 className='text-secondary'>{story?.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: story?.body }}></div>
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
                  <div
                     onClick={() => setIsCommentOpen(true)}
                     className='flex gap-2 items-center p-2 rounded-md hover:bg-secondary hover:bg-opacity-30 duration-300 cursor-pointer'
                  >
                     <span className='hidden md:block'>Comments</span>
                     <span className='text-secondary'>
                        <FaRegCommentDots />
                     </span>
                     <small>{comments}</small>
                  </div>
               </div>
               {story?.user_id !== user?.id ? null : (
                  <div className='flex gap-3 mt-2'>
                     <div
                        onClick={() => setIsOpen(true)}
                        className='flex gap-2 items-center p-2 rounded-md hover:bg-secondary hover:bg-opacity-30 duration-300 cursor-pointer'
                     >
                        <span className='text-warning'>
                           <MdEditNote />
                        </span>
                        <span className='hidden md:block'>Edit</span>
                     </div>
                     <div
                        onClick={onDeleteHandler}
                        className='flex gap-2 items-center p-2 rounded-md hover:bg-secondary hover:bg-opacity-30 duration-300 cursor-pointer'
                     >
                        <span className='text-danger'>
                           <MdOutlineDeleteOutline />
                        </span>
                        <span className='hidden md:block'>Delete</span>
                     </div>
                  </div>
               )}
            </div>
         </div>

         {!isOpen ? null : (
            <StoryEdit story={story} isOpen={isOpen} setIsOpen={setIsOpen} />
         )}
         {!isCommentOpen ? null : (
            <Comments
               story_id={story?.id}
               isOpen={isCommentOpen}
               closeComments={() => setIsCommentOpen(false)}
            />
         )}
      </div>
   )
}

export default StoryPage
