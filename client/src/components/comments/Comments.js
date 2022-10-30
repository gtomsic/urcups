import React, { useReducer } from 'react'

import CommentsForm from './CommentsForm'
import CommentItem from './CommentItem'
import { ACTION } from './commentsContant'
import { commentReducers } from './commentsReducers'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/features/user/userSlice'
const Comments = ({ story_id }) => {
   const { user } = useSelector(selectUser)
   const reducerDispatch = useDispatch()
   const [state, dispatch] = useReducer(commentReducers, {
      story_id,
      body: '',
      user_id: user?.id,
   })
   const onSubmitHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log(state)
   }
   return (
      <div className='relative h-screen w-full max-w-[600px]'>
         <CommentsForm
            onSubmit={onSubmitHandler}
            value={state.body}
            onChange={(event) =>
               dispatch({
                  type: ACTION.SET_BODY,
                  payload: event.target.value,
               })
            }
         />
         <div className='flex flex-col gap-2 p-3 bg-dark bg-opacity-50 rounded-lg h-[87vh]'>
            <CommentItem />
            <CommentItem />
            <CommentItem />
            <CommentItem />
            <CommentItem />
            <CommentItem />
         </div>
      </div>
   )
}

export default Comments
