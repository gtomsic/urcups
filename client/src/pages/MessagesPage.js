import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MessageItem from '../components/messages/MessageItem'
import {
   getAllMessages,
   selectAllMessages,
} from '../store/features/messages/messagesSlice'
import { selectUser } from '../store/features/user/userSlice'

const MessagesPage = () => {
   const isFetch = useRef(false)
   const url = useSelector((state) => state.url)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { user } = useSelector(selectUser)
   const { messages, messagesOffset, messagesLimit } =
      useSelector(selectAllMessages)
   useEffect(() => {
      if (isFetch.current === false) {
         dispatch(
            getAllMessages({
               offset: messagesOffset,
               limit: messagesLimit,
               token: user.token,
               user_id: user.id,
            })
         )
      }
      return () => {
         isFetch.current = true
      }
   }, [dispatch, messagesLimit, messagesOffset, user])
   const onClickHandler = (e, user_id) => {
      e.stopPropagation()
      navigate(`/messages/${user_id}`)
   }
   return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
         {messages?.map((message) => (
            <div
               onClick={(e) => onClickHandler(e, message.user_id)}
               key={message.id}
               className='shadow-md hover:shadow-secondary rounded-xl'
            >
               <MessageItem
                  key={message.id}
                  image={message.avatar}
                  isRead={message.isRead}
                  isOnline={message.isOnline}
                  body={message.body}
                  time={message.createdAt}
                  message={message}
               />
            </div>
         ))}
      </div>
   )
}

export default MessagesPage
