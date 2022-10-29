import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
   const navigate = useNavigate()
   const url = useSelector((state) => state.url)
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
   const onClickHandler = (e, id) => {
      e.stopPropagation()
      e.preventDefault()
      navigate(`/stories/${id}`)
   }
   return (
      <>
         {!storiesIsLoading ? null : <Loader>Loading stories...</Loader>}
         <div className='grid grid-cols-1 gap-5 lg:gap-4 xl:gap-3 lg:grid-cols-2 xl:grid-cols-3'>
            {stories?.rows?.map((item) => (
               <div onClick={(e) => onClickHandler(e, item.id)} key={item.id}>
                  <StoryItem story={{ ...item, image: url + item.image }} />
               </div>
            ))}
         </div>
      </>
   )
}

export default StoriesPage
