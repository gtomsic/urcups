import React, { useState } from 'react'

const MessageForm = ({ user }) => {
   const [message, onChange] = useState('')
   const submitHandler = (e) => {
      e.preventDefault()
   }
   return (
      <form
         onSubmit={submitHandler}
         className=' lg:rounded-t-2xl overflow-hidden'
      >
         <textarea
            value={message}
            onChange={onChange}
            name='message'
            id='message'
            rows='4'
            className='bg-white w-full  text-dark p-5 resize-none rounded-none'
            placeholder={`Send message to ${user.username}...`}
         ></textarea>
         <div className='grid mt-[-6px] grid-cols-2 items-center'>
            <div className='bg-gradient-to-b from-primary hover:bg-secondary bg-dark duration-300 border border-primary lg:rounded-b-2xl py-5 cursor-pointer text-center'>
               Attached Photo
            </div>

            <button className='bg-gradient-to-b from-primary hover:bg-secondary bg-dark duration-300 border border-primary lg:rounded-b-2xl p-5 text-center'>
               Send
            </button>
         </div>
      </form>
   )
}

export default MessageForm
