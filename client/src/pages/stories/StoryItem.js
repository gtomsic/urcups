import React from 'react'
import { FaRegHeart, FaRegCommentDots } from 'react-icons/fa'

const StoryItem = ({ story }) => {
   return (
      <div className='flex flex-col rounded-3xl p-5 bg-gradient-to-b from-secondary text-light cursor-pointer'>
         <div
            style={{
               backgroundImage: `url(${story?.image})`,
               backgroundPosition: 'top',
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
            }}
            className='rounded-2xl h-[300px]'
         ></div>
         <div className='mt-3'>
            <h3>{story?.title}</h3>
            <p>
               {story?.body.split('').length > 100 ? (
                  <>
                     {story?.body.split('').splice(0, 100).join('')}
                     <span className='text-secondary'> View more...</span>
                  </>
               ) : (
                  story?.body
               )}
            </p>
         </div>
         {/* Interactions Buttons */}
         <div className='flex gap-3 mt-2'>
            <div className='flex gap-2 items-center p-2 rounded-md hover:bg-secondary hover:bg-opacity-30 duration-300 cursor-pointer'>
               <span>Loves</span>
               <span className='text-danger'>
                  <FaRegHeart />
               </span>
               <small>23</small>
            </div>
            <div className='flex gap-2 items-center p-2 rounded-md hover:bg-secondary hover:bg-opacity-30 duration-300 cursor-pointer'>
               <span>Comments</span>
               <span className='text-secondary'>
                  <FaRegCommentDots />
               </span>
               <small>137</small>
            </div>
         </div>
      </div>
   )
}

export default StoryItem
