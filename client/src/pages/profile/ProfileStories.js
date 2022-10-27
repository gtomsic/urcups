import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
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
   const [isOpen, setIsOpen] = useState(true)
   const { user } = useSelector(selectUser)
   const { profile } = useSelector(selectProfile)
   const onCloseHandler = (e) => {
      e.preventDefault()
   }
   return (
      <div className='relative grid grid-cols-1 gap-5 lg:gap-4 xl:gap-3 lg:grid-cols-2 xl:grid-cols-3 '>
         {user?.id !== profile?.id || !user?.id ? null : (
            <div className='flex flex-col justify-center items-center gap-3 min-h-[400px] max-h-full text-5xl text-white bg-gradient-to-tr from-secondary to-primary p-3 rounded-3xl hover:from-danger hover:to-primary duration-300 cursor-pointer'>
               <FaPlus />
               <h2>CREATE</h2>
            </div>
         )}
         <StoryItem />
         <StoryItem />
         <StoryItem />
         <StoryItem />
         <StoryItem />
         {!isOpen ? null : (
            <Modal>
               <Container>
                  <div className='w-full grid grid-cols-12 gap-5'>
                     <div className='col-span-8 rounded-3xl bg-light p-5'>
                        <div className='flex justify-center items-center p-5 rounded-2xl bg-white cursor-pointer'>
                           <FaPlus />
                        </div>
                        <TextInput title='Story Header' />
                        <textarea
                           name='body'
                           id='story-body'
                           rows='15'
                           placeholder='Write your story...'
                           className='bg-white p-3 w-full resize-none'
                        ></textarea>
                        <div className='grid grid-cols-3 gap-1'>
                           <PrimaryButton add='from-gray to-dark'>
                              Cancel
                           </PrimaryButton>
                           <PrimaryButton add='from-primary to-dark'>
                              Save
                           </PrimaryButton>
                           <PrimaryButton>Publish</PrimaryButton>
                        </div>
                     </div>
                     <div className='col-span-4'>
                        <StoryItem />
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
