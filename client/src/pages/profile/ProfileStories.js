import React, { useState } from 'react'
import { FaPlus, FaCamera } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../store/features/profile/profileSlice'
import { selectUser } from '../../store/features/user/userSlice'
import { AiOutlineClose } from 'react-icons/ai'

import StoryItem from '../stories/StoryItem'
import Modal from '../../components/Modal'
import Container from '../../components/Container'
import PrimaryButton from '../../components/PrimaryButton'
import TextInput from '../../components/forms/TextInput'

const ProfileReader = () => {
   const [isOpen, setIsOpen] = useState(false)
   const [image, setImage] = useState(null)
   const [title, setTitle] = useState('')
   const [body, setBody] = useState('')
   const { user } = useSelector(selectUser)
   const { profile } = useSelector(selectProfile)
   const story = {
      title: 'Jenny and Mark',
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quisquam magnam architecto corporis, unde id accusamus porro illo repudiandae dolorum voluptatum rem? Tempore, quas illum minima ratione aliquid amet consequatur.`,
      image: `https://images.pexels.com/photos/853151/pexels-photo-853151.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-853151.jpg&fm=jpg&_gl=1*1934syx*_ga*OTQ2NzgxMzMyLjE2NjY2NjEzOTY.*_ga_8JE65Q40S6*MTY2NjY2MTM5Ny4xLjEuMTY2NjY2Mjk4Ny4wLjAuMA..`,
   }
   const onCloseHandler = (e) => {
      e.preventDefault()
      setIsOpen(false)
   }
   return (
      <div className='relative grid grid-cols-1 gap-5 lg:gap-4 xl:gap-3 lg:grid-cols-2 xl:grid-cols-3 '>
         {user?.id !== profile?.id || !user?.id ? null : (
            <div
               onClick={() => setIsOpen(true)}
               className='flex flex-col justify-center items-center gap-3 min-h-[400px] max-h-full text-5xl text-white bg-gradient-to-tr from-secondary to-primary p-3 rounded-3xl hover:from-danger hover:to-primary duration-300 cursor-pointer'
            >
               <FaPlus />
               <h2>CREATE</h2>
            </div>
         )}
         <StoryItem story={story} />
         <StoryItem story={story} />
         <StoryItem story={story} />
         <StoryItem story={story} />
         <StoryItem story={story} />

         {!isOpen ? null : (
            <Modal>
               <Container>
                  <div className='w-full grid grid-cols-12 gap-5'>
                     <div className='col-span-8 rounded-3xl bg-light p-5'>
                        <div className='flex justify-center items-center p-5 rounded-md text-white bg-gradient-to-tr from-secondary to-primary hover:from-danger hover:to-primary cursor-pointer overflow-hidden'>
                           <FaCamera />
                        </div>
                        <TextInput title='Title of story' />
                        <textarea
                           name='body'
                           id='story-body'
                           rows='15'
                           placeholder='Write your story...'
                           className='bg-white p-3 w-full resize-none'
                        ></textarea>
                        <div className='grid grid-cols-2 gap-1'>
                           <PrimaryButton add='from-gray to-dark'>
                              Cancel
                           </PrimaryButton>
                           <PrimaryButton>Create</PrimaryButton>
                        </div>
                     </div>
                     <div className='col-span-4'>
                        <StoryItem story={story} />
                     </div>
                  </div>
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
