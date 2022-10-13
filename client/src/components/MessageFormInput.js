import React from 'react'
import ReactDOM from 'react-dom'
import { AiFillCamera } from 'react-icons/ai'
import { IoSend } from 'react-icons/io5'

const MessageFormInput = () => {
   const onClickHandler = (e) => {
      e.stopPropagation()
   }
   return ReactDOM.createPortal(
      <div
         onClick={onClickHandler}
         className='fixed z-40 bottom-0 bg-gradient-to-tr from-secondary bg-primary lg:rounded-xl w-full left-0 translate-x-0 lg:max-w-[40%] px-2 py-3 lg:left-[50%] lg:translate-x-[-50%]'
      >
         <form className='flex gap-1'>
            <div className='flex justify-center items-center text-4xl text-white cursor-pointer'>
               <AiFillCamera />
            </div>
            <input
               type='text'
               placeholder='Write your message...'
               className='p-3 bg-white rounded-md flex-1 text-dark'
            />
            <div className='flex justify-center items-center text-4xl text-white cursor-pointer'>
               <IoSend />
            </div>
         </form>
      </div>,
      document.querySelector('#message-portal')
   )
}

export default MessageFormInput
