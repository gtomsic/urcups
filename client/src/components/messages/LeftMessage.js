import React from 'react'
import Avatar from '../Avatar'

const LeftMessage = ({ children }) => {
   return (
      <div className='flex justify-start overflow-hidden w-full z-0'>
         <div className='flex gap-3 my-2 max-w-[90%]'>
            <div className='pt-9'>
               <Avatar isOnline={true} />
            </div>
            <div className='flex flex-col'>
               <h4 className='text-white text-left ml-3'>user_name</h4>
               <div
                  className='right-message relative p-4 text-white bg-secondary rounded-2xl 
               before:content-[""] before:w-4 before:h-4 before:bg-secondary before:absolute before:left-[-6px] before:origin-center before:rotate-45 before:top-5'
               >
                  {children}
               </div>
               <div className='flex justify-end'>
                  <small className='text-gray mr-3 text-right'>
                     Today 5 minutes ago
                  </small>
               </div>
            </div>
         </div>
      </div>
   )
}

export default LeftMessage
