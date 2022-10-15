import React from 'react'
import Avatar from '../Avatar'

import moment from 'moment'

const RightMessage = ({ children, profile, message }) => {
   return (
      <div className='flex justify-end overflow-hidden w-full z-0'>
         <div className='flex gap-3 my-2 max-w-[90%]'>
            <div>
               <h4 className='text-white text-right mr-3'>
                  {profile?.username}
               </h4>
               <div
                  className='right-message relative p-4 text-white bg-secondary rounded-2xl 
                  before:content-[""] before:w-4 before:h-4 before:bg-secondary before:absolute before:right-[-6px] before:origin-center before:rotate-45 before:top-5'
               >
                  {children}
               </div>
               <small className='text-gray ml-3'>
                  {moment(message?.createdAt).fromNow()}
               </small>
            </div>
            <div className='pt-9'>
               <Avatar
                  isOnline={profile?.isOnline}
                  image={profile?.thumbnail}
               />
            </div>
         </div>
      </div>
   )
}

export default RightMessage
