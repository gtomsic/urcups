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
import { selectComments } from '../store/features/comments/commentsSlice'
import { serviceCountComments } from '../store/features/comments/serviceComments'
import { fetchUser } from '../store/features/user/userService'
import Avatar from '../components/Avatar'
import moment from 'moment'
import { socket } from '../socket'

const StoryPage = () => {
   const scrollView = useRef(null)
   const params = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isLove, setIsLove] = useState(0)
   const [isOpen, setIsOpen] = useState(false)
   const [loves, setLoves] = useState(0)
   const { story, storyIsLoading } = useSelector(selectStory)
   const { comments } = useSelector(selectComments)
   const [countComments, setCountComments] = useState(comments.count)
   const { user } = useSelector(selectUser)
   const [profile, setProfile] = useState({})
   const url = useSelector((state) => state.url)
   useEffect(() => {
      dispatch(getStoryById(params.story_id))
   }, [params, dispatch])
   useEffect(() => {
      setCountComments(comments.count)
   }, [comments.count])
   useEffect(() => {
      const timerId = setTimeout(() => {
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
            const response = await serviceCountComments(story.id)
            setCountComments(response.count)
            const getProfile = await fetchUser(story.user_id)
            setProfile(getProfile)
         }
         fetchStory()
      }, 500)
      return () => {
         clearTimeout(timerId)
      }
   })
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
      socket.emit('stories', { ...story, path: `/love/${story.id}` })
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
            className={
               story?.body?.split('').length < 1500
                  ? 'block pb-5'
                  : 'block lg:float-left lg:pr-3'
            }
         />
         <div className='mt-5 lg:mt-0 text-light'>
            <h3 className='text-secondary'>{story?.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: story?.body }}></div>
            {/* Publish by User */}
            <div className='my-10 inline-block'>
               <div
                  onClick={() => navigate(`/profile/${profile?.username}`)}
                  className='flex gap-2 items-center cursor-pointer py-3 border-b border-white hover:border-secondary duration-300'
               >
                  <div>
                     <Avatar
                        image={profile?.avatar}
                        isOnline={profile?.isOnline}
                     />
                  </div>
                  <div className='flex flex-col'>
                     <span>Publish by: {profile?.username}</span>
                     <small>{moment(story?.updatedAt).fromNow()}</small>
                  </div>
               </div>
            </div>

            <div className='flex justify-between'>
               <div className='flex gap-3 mt-2'>
                  <div
                     onClick={loveClickHandler}
                     className={
                        !user?.id
                           ? 'flex gap-2 items-center'
                           : 'flex gap-2 items-center p-2 rounded-md hover:bg-secondary hover:bg-opacity-30 duration-300 cursor-pointer'
                     }
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
                     className={
                        !user?.id
                           ? 'flex gap-2 items-center'
                           : 'flex gap-2 items-center p-2 rounded-md '
                     }
                  >
                     <span className='hidden md:block'>Comments</span>
                     <span className='text-secondary'>
                        <FaRegCommentDots />
                     </span>
                     <small>{countComments}</small>
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
         <Comments profile={profile} story={story} />
      </div>
   )
}

export default StoryPage
