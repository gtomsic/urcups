import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AttentionMessage from '../components/AttentionMessage';
import Avatar from '../components/Avatar';
import Loader from '../components/loader/Loader';
import PrimaryButton from '../components/PrimaryButton';
import {
   clearStories,
   getAllPublicStories,
   getMorePublicStories,
   selectStories,
   setPublicStoriesOffset,
} from '../store/features/stories/storySlice';
import { selectUser } from '../store/features/user/userSlice';
import StoryItem from './stories/StoryItem';

const StoriesPage = () => {
   let isFetch = useRef(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const url = useSelector((state) => state.url);
   const { user } = useSelector(selectUser);
   const { stories, storiesIsLoading, storiesOffset, storiesLimit } =
      useSelector(selectStories);
   useEffect(() => {
      if (isFetch.current === false) {
         dispatch(
            getAllPublicStories({ limit: storiesLimit, offset: storiesOffset })
         );
      }
      return () => {
         isFetch.current = true;
         dispatch(clearStories());
      };
   }, []);
   const onClickHandler = (e, id) => {
      e.stopPropagation();
      e.preventDefault();
      navigate(`/stories/${id}`);
   };
   const onMoreButtonHandler = () => [
      dispatch(
         getMorePublicStories({
            limit: storiesLimit,
            offset: storiesOffset + 1,
         })
      ),
      dispatch(setPublicStoriesOffset(storiesOffset + 1)),
   ];
   return (
      <>
         {stories?.rows?.length < 1 && user?.id ? (
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
         {stories?.rows?.length < 1 && !user?.id ? (
            <AttentionMessage title={`No stories item this time.`}>
               <p>Urcups is completely free.</p>
               <p>
                  Urcups is for serious people who's looking for lifetime
                  partner.
               </p>
               <p>We always value your feedback and concern.</p>
               <p>At urcups there is no place for scammers.</p>
            </AttentionMessage>
         ) : null}
         <div className='relative grid grid-cols-1 gap-3 lg:gap-4 xl:gap-3 md:grid-cols-2 lg:grid-cols-3'>
            {stories?.rows?.map((item) => (
               <div onClick={(e) => onClickHandler(e, item.id)} key={item.id}>
                  <StoryItem story={{ ...item, image: url + item.image }} />
               </div>
            ))}
         </div>
         {!storiesIsLoading ? null : <Loader>Loading stories...</Loader>}
         {stories?.count === stories?.rows?.length ? null : (
            <div
               onClick={onMoreButtonHandler}
               className='mt-5 text-center text-white cursor-pointer'
            >
               More...
            </div>
         )}
      </>
   );
};

export default StoriesPage;
