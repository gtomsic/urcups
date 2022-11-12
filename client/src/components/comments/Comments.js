import React, { useEffect, useReducer, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommentsForm from './CommentsForm';
import CommentItem from './CommentItem';
import { commentAction } from './commentsContant';
import { commentReducers } from './commentsReducers';
import { selectUser } from '../../store/features/user/userSlice';
import {
   countComments,
   createComments,
   getComments,
   moreComments,
   selectComments,
} from '../../store/features/comments/commentsSlice';
import AttentionMessage from '../AttentionMessage';
import Loader from '../loader/Loader';
import { useParams } from 'react-router-dom';
import { actionBells } from '../../store/features/bells/bellsSlice';
import { socket } from '../../socket';
import { selectPayment } from '../../store/features/payment/paymentSlice';

const Comments = ({ profile, story }) => {
   const reduxDispatch = useDispatch();
   const params = useParams();
   const isFetch = useRef(false);
   const { user } = useSelector(selectUser);
   const [state, dispatch] = useReducer(commentReducers, {
      story_id: params.story_id,
      body: '',
      user_id: user?.id,
      token: user?.token,
      offset: 0,
      limit: 10,
   });
   const { comments, commentsLoading } = useSelector(selectComments);
   const { paid } = useSelector(selectPayment);

   useEffect(() => {
      if (isFetch.current === false) {
         reduxDispatch(
            getComments({
               story_id: params.story_id,
               token: user?.token,
               offset: state.offset,
               limit: state.limit,
            })
         );
      }
      return () => {
         isFetch.current = true;
      };
   }, [params, state.limit, state.offset, user, reduxDispatch]);
   const onMoreButtonHandler = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      reduxDispatch(
         moreComments({
            story_id: params.story_id,
            token: user?.token,
            offset: state.offset + 1,
            limit: state.limit,
         })
      );
      dispatch({
         type: commentAction.SET_OFFSET,
         payload: state.offset + 1,
      });
   };
   const onSubmitHandler = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!Boolean(state.body.trim())) return;
      await reduxDispatch(createComments(state));
      dispatch({ type: commentAction.SET_BODY, payload: '' });
      reduxDispatch(countComments(params.story_id));
      socket.emit('stories', {
         id: params.story_id,
         path: `/comments/${params.story_id}`,
      });
      if (story?.user_id === user?.id) return;
      reduxDispatch(
         actionBells({
            subject: 'New comment!',
            title: `${user?.username} wrote on your story.`,
            link: `/stories/${params.story_id}`,
            user_id: profile?.id,
            body: `Would you like to check on ${
               user?.sex === 'Male' ? 'his' : 'her'
            } comment? 😄`,
            token: user?.token,
         })
      );
   };
   return (
      <>
         <div className='relative w-full'>
            {!user?.id || paid?.days < 1 ? null : (
               <CommentsForm
                  onSubmit={onSubmitHandler}
                  value={state.body}
                  onChange={(event) =>
                     dispatch({
                        type: commentAction.SET_BODY,
                        payload: event.target.value,
                     })
                  }
               />
            )}
            <div className='flex flex-col gap-1 p-3 bg-dark bg-opacity-50 rounded-lg mb-[100px]'>
               {comments.rows?.length < 1 ? (
                  <AttentionMessage title='No comments at moment.'>
                     <p>Start your comment here.</p>
                     <p>Please respect each other's privacy.</p>
                  </AttentionMessage>
               ) : null}
               {comments.rows.map((item) => (
                  <CommentItem
                     key={item?.id}
                     comment={item}
                     getComments={() =>
                        reduxDispatch(
                           getComments({
                              story_id: params.story_id,
                              token: user?.token,
                              offset: state.offset,
                              limit: state.limit,
                           })
                        )
                     }
                  />
               ))}
               {!commentsLoading ? null : <Loader>Loading comments...</Loader>}
               {comments?.count >= comments?.rows?.length ? (
                  <div className='py-8'></div>
               ) : (
                  <div
                     onClick={onMoreButtonHandler}
                     className='flex justify-center text-light py-5 mb-[100px] hover:text-secondary duration-300 cursor-pointer'
                  >
                     More...
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default Comments;
