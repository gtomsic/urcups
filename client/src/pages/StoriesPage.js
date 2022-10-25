import React from 'react'
import StoryItem from './stories/StoryItem'

const StoriesPage = () => {
   return (
      <div className='grid grid-cols-1 gap-5 lg:gap-3 xl:gap-2 lg:grid-cols-2 xl:grid-cols-3'>
         <StoryItem />
         <StoryItem />
         <StoryItem />
         <StoryItem />
         <StoryItem />
         <StoryItem />
         <StoryItem />
      </div>
   )
}

export default StoriesPage
