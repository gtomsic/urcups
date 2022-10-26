import React from 'react'
import { FaPlus } from 'react-icons/fa'
import StoryItem from '../stories/StoryItem'

const ProfileReader = () => {
   return (
      <div className='relative grid grid-cols-1 gap-5 lg:gap-4 xl:gap-3 lg:grid-cols-2 xl:grid-cols-3 '>
         <div className='flex flex-col justify-center items-center gap-3 min-h-[400px] max-h-full text-5xl text-white bg-gradient-to-tr from-secondary to-primary p-3 rounded-3xl hover:from-danger hover:to-primary duration-300 cursor-pointer'>
            <FaPlus />
            <h2>CREATE</h2>
         </div>
         <StoryItem />
         <StoryItem />
         <StoryItem />
         <StoryItem />
         <StoryItem />
      </div>
   )
}

export default ProfileReader
