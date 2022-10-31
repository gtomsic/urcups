import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AttentionMessage from '../components/AttentionMessage'
import Avatar from '../components/Avatar'
import Loader from '../components/loader/Loader'
import PrimaryButton from '../components/PrimaryButton'
import {
   clearStories,
   getAllPublicStories,
   selectStories,
} from '../store/features/stories/storySlice'
import { selectUser } from '../store/features/user/userSlice'
import StoryItem from './stories/StoryItem'

const StoriesPage = () => {
   let isFetch = useRef(false)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const url = useSelector((state) => state.url)
   const { user } = useSelector(selectUser)
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
         {stories?.rows?.length < 1 ? (
            <AttentionMessage title={`Write your story to start!`}>
               <p>Share your story to others.</p>
               <p>Please start here.</p>
               <br />
               <PrimaryButton
                  onClick={() => navigate(`/profile/${user?.username}/stories`)}
               >
                  <span>Start here</span>
                  <Avatar image={user?.avatar} isOnline={user?.isOnline} />
                  {user?.username}
               </PrimaryButton>
            </AttentionMessage>
         ) : null}
         {!storiesIsLoading ? null : <Loader>Loading stories...</Loader>}
         <div className='relative grid grid-cols-1 gap-3 lg:gap-4 xl:gap-3 md:grid-cols-2 lg:grid-cols-3'>
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
