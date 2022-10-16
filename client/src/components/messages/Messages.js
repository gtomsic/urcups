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
   const dispatch = useDispatch()
   const { user } = useSelector(selectUser)
   const { message } = useSelector(selectMessage)
   const { messages, messagesSuccess, messagesOffset, messagesLimit } =
      useSelector(selectAllMessages)

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
      <div className='flex flex-col sticky top-[85px] gap-3'>
         <div className='bg-light w-full  py-1 px-4  rounded-full'>
            <input
               type='search'
               name='search'
               id='search'
               placeholder='Search users...'
               className='py-1 bg-light text-dark w-full outline-none border-none'
            />
         </div>
         <div className='flex flex-col gap-2 h-[400px] overflow-hidden hover:overflow-y-scroll'>
            {messages?.map((message) => (
               <MessageItem
                  key={message.id}
                  image={message.avatar}
                  isRead={message.isRead}
                  isOnline={message.isOnline}
                  body={message.body}
                  time={message.createdAt}
                  message={message}
               />
            ))}
         </div>
      </div>
   )
}

export default Messages
