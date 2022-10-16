import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   getAllMessages,
   selectAllMessages,
   selectMessage,
} from '../../store/features/messages/messagesSlice'
import { selectUser } from '../../store/features/user/userSlice'
import MessageItem from './MessageItem'

const Messages = () => {
   const isFetch = useRef(false)
   const scrollView = useRef(null)
   const dispatch = useDispatch()
   const { user } = useSelector(selectUser)
   const { message } = useSelector(selectMessage)
   const { messages, messagesSuccess, messagesOffset, messagesLimit } =
      useSelector(selectAllMessages)

   useEffect(() => {
      scrollView.current?.scrollIntoView()
   }, [messages])

   useEffect(() => {
      dispatch(
         getAllMessages({
            offset: messagesOffset,
            limit: messagesLimit,
            token: user.token,
            user_id: user.id,
         })
      )
   }, [message])

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
   return (
      <div className='h-[400px] overflow-scroll'>
         <div ref={scrollView} />
         {messages?.map((message) => (
            <div
               key={message.id}
               className='my-2 shadow-md hover:shadow-secondary rounded-2xl'
            >
               <MessageItem
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

export default Messages
