import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import Modal from '../../components/Modal'
import Container from '../../components/Container'
import TextInput from '../../components/forms/TextInput'
import { createStoryText } from '../../store/features/stories/storySlice'
import { selectUser } from '../../store/features/user/userSlice'
import PrimaryButton from '../../components/PrimaryButton'

const StoryEdit = ({ story, isOpen, setIsOpen }) => {
   const dispatch = useDispatch()
   const [title, setTitle] = useState(story.title)
   const [body, setBody] = useState(story.body)
   const { user } = useSelector(selectUser)
   const onSubmitHandler = async (e) => {
      e.preventDefault()
      e.stopPropagation()
      const newBody = body?.split('\n').join('<br/>')
      await dispatch(
         createStoryText({
            id: story.id,
            title,
            body: newBody,
            token: user?.token,
         })
      )
      setIsOpen(!isOpen)
   }
   return (
      <Modal>
         <Container>
            <form onSubmit={onSubmitHandler} className='h-screen'>
               <TextInput
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  title='Title of story'
               />
               <textarea
                  type='text'
                  value={body?.split('<br/>').join('\n')}
                  onChange={(e) => setBody(e.target.value)}
                  name='body'
                  id='story-body'
                  placeholder='Write your story...'
                  className='bg-white h-[80vh]  p-5 w-full resize-none'
               ></textarea>
               <div className='grid grid-cols-2 gap-2'>
                  <PrimaryButton onClick={() => setIsOpen(false)}>
                     Cancel
                  </PrimaryButton>
                  <PrimaryButton type='submit'>Submit</PrimaryButton>
               </div>
            </form>
         </Container>
         <div
            onClick={() => setIsOpen(!isOpen)}
            className='absolute z-30 top-0 right-0 p-3 rounded-bl-3xl text-white text-2xl lg:text-5xl bg-gradient-to-tr from-primary bg-secondary hover:from-danger hover:to-primary cursor-pointer'
         >
            <AiOutlineClose />
         </div>
      </Modal>
   )
}

export default StoryEdit
