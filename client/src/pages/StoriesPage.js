import React from 'react'
import StoryItem from './stories/StoryItem'

const StoriesPage = () => {
   const story = {
      title: 'Jenny and Mark',
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quisquam magnam architecto corporis, unde id accusamus porro illo repudiandae dolorum voluptatum rem? Tempore, quas illum minima ratione aliquid amet consequatur.`,
      image: `https://images.pexels.com/photos/853151/pexels-photo-853151.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-853151.jpg&fm=jpg&_gl=1*1934syx*_ga*OTQ2NzgxMzMyLjE2NjY2NjEzOTY.*_ga_8JE65Q40S6*MTY2NjY2MTM5Ny4xLjEuMTY2NjY2Mjk4Ny4wLjAuMA..`,
   }
   return (
      <div className='grid grid-cols-1 gap-5 lg:gap-4 xl:gap-3 lg:grid-cols-2 xl:grid-cols-3'>
         <StoryItem story={story} />
         <StoryItem story={story} />
         <StoryItem story={story} />
         <StoryItem story={story} />
         <StoryItem story={story} />
         <StoryItem story={story} />
         <StoryItem story={story} />
         <StoryItem story={story} />
      </div>
   )
}

export default StoriesPage
