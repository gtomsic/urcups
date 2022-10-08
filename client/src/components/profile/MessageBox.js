import React from 'react'

const MessageBox = ({ children, title }) => {
   return (
      <div className='max-w-[600px] w-full mx-auto bg-gradient-to-bl from-primary text-white p-7 rounded-3xl'>
         {!title ? null : <h2>{title}</h2>}
         <div className='my-8 flex flex-col gap-5'>{children}</div>
      </div>
   )
}

export default MessageBox
