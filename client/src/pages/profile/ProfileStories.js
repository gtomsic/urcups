import React, { useEffect, useState } from 'react'
import { FaPlus, FaCamera } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile } from '../../store/features/profile/profileSlice'
import { selectUser } from '../../store/features/user/userSlice'
import { AiOutlineClose } from 'react-icons/ai'

import StoryItem from '../stories/StoryItem'
import Modal from '../../components/Modal'
import Container from '../../components/Container'
import PrimaryButton from '../../components/PrimaryButton'
import TextInput from '../../components/forms/TextInput'
import {
   createStory,
   getAllUserStories,
   selectStory,
   selectUserStories,
} from '../../store/features/stories/storySlice'
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'

const ProfileReader = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isOpen, setIsOpen] = useState(false)
   const [limit, setLimit] = useState(100)
   const [offset, setOffset] = useState(0)
   const [image, setImage] = useState(null)
   const [file, setFile] = useState(null)
   const [title, setTitle] = useState('')
   const [body, setBody] = useState('')
   const { user } = useSelector(selectUser)
   const { profile } = useSelector(selectProfile)
   const { story, storyIsLoading } = useSelector(selectStory)
   const { userStories, userStoriesIsLoading } = useSelector(selectUserStories)
   const url = useSelector((state) => state.url)
   useEffect(() => {
      dispatch(getAllUserStories({ limit, offset, id: profile?.id }))
   }, [story])
   const onClickHandler = (e, id) => {
      e.preventDefault()
      e.stopPropagation()
      navigate(`/stories/${id}`)
   }
   const onCloseHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsOpen(false)
   }
   const onCancelHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsOpen(false)
      setImage(null)
      setBody('')
      setTitle('')
   }
   const onChangeImageHandler = (e) => {
      setFile(e.target.files[0])
      setImage(URL.createObjectURL(e.target.files[0]))
   }
   const onSubmitHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      const data = new FormData()
      data.append('story', file)
      dispatch(createStory({ token: user?.token, title, body, data }))
      onCancelHandler(e)
   }
   return (
      <div className='relative grid grid-cols-1 gap-3 lg:gap-4 xl:gap-3 md:grid-cols-2 lg:grid-cols-3'>
         {user?.id !== profile?.id || !user?.id ? null : (
            <div
               onClick={() => setIsOpen(true)}
               className='flex flex-col justify-center items-center gap-3 min-h-[400px] max-h-full text-5xl text-white bg-gradient-to-tr from-secondary to-primary p-3 rounded-3xl hover:from-danger hover:to-primary duration-300 cursor-pointer'
            >
               <FaPlus />
               <h2>CREATE</h2>
            </div>
         )}
         {!storyIsLoading && !userStoriesIsLoading ? null : (
            <div className='flex flex-col justify-center items-center gap-3 min-h-[400px] max-h-full  text-white bg-gradient-to-tr from-secondary to-primary p-3 rounded-3xl hover:from-danger hover:to-primary duration-300 cursor-pointer'>
               <Loader>Creating a story...</Loader>
            </div>
         )}
         {/* Display stories here using map method */}
         {userStories?.rows?.map((item) => (
            <div onClick={(e) => onClickHandler(e, item.id)} key={item.id}>
               <StoryItem story={{ ...item, image: url + item.image }} />
            </div>
         ))}
         {!isOpen ? null : (
            <Modal>
               <Container>
                  <form
                     onSubmit={onSubmitHandler}
                     className='w-full grid grid-cols-1 md:grid-cols-12 gap-5'
                  >
                     <div className='md:col-span-8 rounded-3xl bg-light bg-opacity-20 p-5'>
                        <div className='relative flex justify-center items-center p-5 rounded-md text-white bg-gradient-to-tr from-secondary to-primary hover:from-danger hover:to-primary cursor-pointer overflow-hidden'>
                           {!image ? <FaCamera /> : 'Change Image'}
                           <input
                              onChange={onChangeImageHandler}
                              type='file'
                              name='image'
                              accept='.png, .jpg, .JPEG'
                              className='h-full absolute w-full overflow-hidden cursor-pointer'
                           />
                        </div>
                        <TextInput
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           title='Title of story'
                        />
                        <textarea
                           value={body}
                           onChange={(e) => setBody(e.target.value)}
                           name='body'
                           id='story-body'
                           rows='10'
                           placeholder='Write your story...'
                           className='bg-white  p-3 w-full resize-none'
                        ></textarea>
                        <div className='grid grid-cols-2 gap-1'>
                           <PrimaryButton
                              onClick={onCancelHandler}
                              add='from-gray to-dark'
                           >
                              Cancel
                           </PrimaryButton>
                           <PrimaryButton>Create</PrimaryButton>
                        </div>
                     </div>
                     <div className='hidden md:block md:col-span-4'>
                        <StoryItem story={{ title, body, image }} />
                     </div>
                  </form>
               </Container>

               <div
                  onClick={onCloseHandler}
                  className='absolute z-30 top-0 right-0 p-3 rounded-bl-3xl text-white text-2xl lg:text-5xl bg-gradient-to-tr from-primary bg-secondary hover:from-danger hover:to-primary cursor-pointer'
               >
                  <AiOutlineClose />
               </div>
            </Modal>
         )}
      </div>
   )
}

export default ProfileReader
