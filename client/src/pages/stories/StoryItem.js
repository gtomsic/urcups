import React from 'react'
import { FaRegHeart, FaRegCommentDots } from 'react-icons/fa'

const StoryItem = () => {
   const image = `https://images.pexels.com/photos/853151/pexels-photo-853151.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-853151.jpg&fm=jpg&_gl=1*1934syx*_ga*OTQ2NzgxMzMyLjE2NjY2NjEzOTY.*_ga_8JE65Q40S6*MTY2NjY2MTM5Ny4xLjEuMTY2NjY2Mjk4Ny4wLjAuMA..`
   const body = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quisquam magnam architecto corporis, unde id accusamus porro illo repudiandae dolorum voluptatum rem? Tempore, quas illum minima ratione aliquid amet consequatur.`
   return (
      <div className='flex flex-col rounded-3xl p-5 bg-gradient-to-b from-secondary text-light cursor-pointer'>
         <div
            style={{
               backgroundImage: `url(${image})`,
               backgroundPosition: 'top',
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
            }}
            className='rounded-2xl h-[300px]'
         ></div>
         <div className='mt-3'>
            <h3>Gen and Oneil</h3>
            <p>
               {body.split('').length > 100 ? (
                  <>
                     {body.split('').splice(0, 100).join('')}
                     <span className='text-secondary'> View more...</span>
                  </>
               ) : (
                  body
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
