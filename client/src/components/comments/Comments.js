import React, { useEffect, useReducer, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CommentsForm from './CommentsForm'
import CommentItem from './CommentItem'
import { commentAction } from './commentsContant'
import { commentReducers } from './commentsReducers'
import { selectUser } from '../../store/features/user/userSlice'
import {
   countComments,
   createComments,
   getComments,
   moreComments,
   selectComments,
} from '../../store/features/comments/commentsSlice'
import AttentionMessage from '../AttentionMessage'
import Loader from '../loader/Loader'
import { useParams } from 'react-router-dom'

const Comments = () => {
   const reduxDispatch = useDispatch()
   const params = useParams()
   const isFetch = useRef(false)
   const { user } = useSelector(selectUser)
   const { comments, commentsLoading } = useSelector(selectComments)
   const [state, dispatch] = useReducer(commentReducers, {
      story_id: params.story_id,
      body: '',
      user_id: user?.id,
      token: user?.token,
      offset: 0,
      limit: 10,
   })
   useEffect(() => {
      if (isFetch.current === false) {
         reduxDispatch(
            getComments({
               story_id: params.story_id,
               token: user?.token,
               offset: state.offset,
               limit: state.limit,
            })
         )
      }
      return () => {
         isFetch.current = true
      }
   }, [params])
   const onMoreButtonHandler = async (e) => {
      e.preventDefault()
      e.stopPropagation()
      reduxDispatch(
         moreComments({
            story_id: params.story_id,
            token: user?.token,
            offset: state.offset + 1,
            limit: state.limit,
         })
      )
      dispatch({
         type: commentAction.SET_OFFSET,
         payload: state.offset + 1,
      })
   }
   const onSubmitHandler = async (e) => {
      e.preventDefault()
      e.stopPropagation()
      await reduxDispatch(createComments(state))
      dispatch({ type: commentAction.SET_BODY, payload: '' })
      reduxDispatch(countComments(params.story_id))
   }
   return (
      <>
         <div className='relative w-full'>
            {!user?.id ? null : (
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
               {comments?.count === comments?.rows?.length ? (
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
   )
}

export default Comments
