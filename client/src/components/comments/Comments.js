import React, { useEffect, useReducer, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'

import CommentsForm from './CommentsForm'
import CommentItem from './CommentItem'
import Modal from '../Modal'
import { commentAction } from './commentsContant'
import { commentReducers } from './commentsReducers'
import { selectUser } from '../../store/features/user/userSlice'
import {
   createComments,
   getComments,
   resetComments,
   selectComments,
} from '../../store/features/comments/commentsSlice'
import AttentionMessage from '../AttentionMessage'
import Loader from '../loader/Loader'

const Comments = ({ story_id, isOpen, closeComments }) => {
   const reduxDispatch = useDispatch()
   const isFetch = useRef(false)
   const { user } = useSelector(selectUser)
   const { comments, commentsLoading } = useSelector(selectComments)
   const [state, dispatch] = useReducer(commentReducers, {
      story_id,
      body: '',
      user_id: user?.id,
      token: user?.token,
   })
   useEffect(() => {
      if (isFetch.current === false) {
         reduxDispatch(
            getComments({ story_id, token: user?.token, offset: 0, limit: 30 })
         )
      }
      return () => {
         isFetch.current = true
      }
   }, [])
   const onSubmitHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      reduxDispatch(createComments(state))
      dispatch({ type: commentAction.SET_BODY, payload: '' })
   }
   if (!isOpen) return
   return (
      <Modal>
         <div className='relative h-screen w-full max-w-[600px] top-12 md:top-0'>
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
            <div className='flex flex-col gap-2 p-3 bg-dark bg-opacity-50 rounded-lg h-[65vh] md:h-[87vh] overflow-y-scroll'>
               {!commentsLoading ? null : <Loader>Loading comments...</Loader>}
               {comments.rows?.length < 1 ? (
                  <AttentionMessage title='No comments at moment.'>
                     <p>Start your comment here.</p>
                     <p>Please respect each other's privacy.</p>
                  </AttentionMessage>
               ) : (
                  comments?.rows?.map((item) => (
                     <CommentItem key={item?.id} comment={item} />
                  ))
               )}
            </div>
         </div>
         <div
            onClick={closeComments}
            className='absolute z-30 top-0 right-0 p-3 rounded-bl-3xl text-white text-2xl lg:text-5xl bg-gradient-to-tr from-primary bg-secondary hover:from-danger hover:to-primary cursor-pointer'
         >
            <AiOutlineClose />
         </div>
      </Modal>
   )
}

export default Comments
