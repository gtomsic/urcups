import React from 'react'
import Avatar from '../Avatar'

const CommentItem = () => {
   return (
      <div className='flex gap-4'>
         <div>
            <Avatar />
         </div>
         <div className='relative flex-1 flex flex-col bg-dark p-3 rounded-md  before:content-[""] before:w-4 before:h-4 before:bg-dark before:absolute before:left-[-6px] before:origin-center before:rotate-45 before:top-3'>
            <div className='flex justify-between'>
               <h5 className='text-light'>Username</h5>

               <small className='text-gray'>12:00pm time of messages</small>
            </div>
            <p className='text-light'>Comments body of message</p>
         </div>
      </div>
   )
}

export default CommentItem
