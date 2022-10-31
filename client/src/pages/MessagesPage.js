import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AttentionMessage from '../components/AttentionMessage'
import MessageItem from '../components/messages/MessageItem'
import {
   getAllMessages,
   selectAllMessages,
} from '../store/features/messages/messagesSlice'
import { selectUser } from '../store/features/user/userSlice'

const MessagesPage = () => {
   const isFetch = useRef(false)
   const scrollView = useRef(null)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const location = useLocation()
   const { user } = useSelector(selectUser)
   const { messages, messagesOffset, messagesLimit } =
      useSelector(selectAllMessages)
   if (!user?.id) {
      navigate('/')
   }

   useEffect(() => {
      scrollView.current.scrollIntoView()
      if (isFetch.current === false && location.pathname === '/messages') {
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
   }, [dispatch, messagesLimit, messagesOffset, user, location])

   const onClickHandler = (e, user_id) => {
      e.stopPropagation()
      navigate(`/messages/${user_id}`)
   }
   return (
      <>
         <div ref={scrollView} />
         {messages?.length < 1 ? (
            <AttentionMessage title='No messages!'>
               <br />
               <p>You don't have message at the moment.</p>
               <p>Start browsing profile now!</p>
            </AttentionMessage>
         ) : (
            <div className='relative grid grid-cols-1 gap-1 lg:gap-4 xl:gap-3 md:grid-cols-2 lg:grid-cols-3'>
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
         )}
      </>
   )
}

export default MessagesPage
