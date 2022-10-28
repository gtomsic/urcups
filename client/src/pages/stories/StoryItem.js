import React, { useState } from 'react'
import { FaRegHeart, FaRegCommentDots } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const StoryItem = ({ story }) => {
   const [loves, setLoves] = useState(0)
   const [comments, setComments] = useState(0)
   const url = useSelector((state) => state.url)
   return (
      <div className='flex flex-col rounded-3xl p-5 bg-gradient-to-b from-secondary text-light cursor-pointer'>
         {!story?.image ? (
            <div className='flex justify-center items-center rounded-2xl h-[300px] bg-primary text-white'>
               <h3>No Image</h3>
            </div>
         ) : (
            <div
               style={{
                  backgroundImage: `url(${url + story?.image})`,
                  backgroundPosition: 'top',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
               }}
               className='rounded-2xl h-[300px]'
            ></div>
         )}
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
               <small>{loves}</small>
            </div>
            <div className='flex gap-2 items-center p-2 rounded-md hover:bg-secondary hover:bg-opacity-30 duration-300 cursor-pointer'>
               <span>Comments</span>
               <span className='text-secondary'>
                  <FaRegCommentDots />
               </span>
               <small>{comments}</small>
            </div>
         </div>
      </div>
   )
}

export default StoryItem
