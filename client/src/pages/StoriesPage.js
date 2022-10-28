import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/loader/Loader'
import {
   clearStories,
   getAllPublicStories,
   selectStories,
} from '../store/features/stories/storySlice'
import StoryItem from './stories/StoryItem'

const StoriesPage = () => {
   let isFetch = useRef(false)
   const dispatch = useDispatch()
   const { stories, storiesIsLoading } = useSelector(selectStories)
   useEffect(() => {
      if (isFetch.current === false) {
         dispatch(getAllPublicStories({ limit: 42, offset: 0 }))
      }
      return () => {
         isFetch.current = true
         dispatch(clearStories())
      }
   }, [])
   return (
      <>
         {!storiesIsLoading ? null : <Loader>Loading stories...</Loader>}
         <div className='grid grid-cols-1 gap-5 lg:gap-4 xl:gap-3 lg:grid-cols-2 xl:grid-cols-3'>
            {stories?.rows?.map((item) => (
               <div key={item.id}>
                  <StoryItem story={item} />
               </div>
            ))}
         </div>
      </>
   )
}

export default StoriesPage
