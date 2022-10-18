import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import PrimaryButton from '../components/PrimaryButton'
import MessageFormInput from '../components/messages/MessageFormInput'
import RightMessage from '../components/messages/RightMessage'
import LeftMessage from '../components/messages/LeftMessage'
import { useDispatch, useSelector } from 'react-redux'
import {
   clearRoomProfile,
   countAllUnreadMessages,
   getMessageUserProfile,
   getRoomMessages,
   insertMessage,
   insertMessages,
   selectIsTyping,
   selectMessage,
   selectMessageUserProfile,
   sendMessage,
   setIsTypingToFalse,
   setIsTypingToTrue,
} from '../store/features/messages/messagesSlice'
import { selectUser } from '../store/features/user/userSlice'
import AttentionMessage from '../components/AttentionMessage'
import { socket } from '../socket'
import MessageProfileCard from '../components/messages/MessageProfileCard'
import Messages from '../components/messages/Messages'
import Avatar from '../components/Avatar'

const MessagePage = () => {
   const navigate = useNavigate()
   const params = useParams()
   const dispatch = useDispatch()
   const isFetch = useRef(false)
   const scrollEnd = useRef(null)
   const [onInputFocus, setOnInputFocus] = useState(false)
   const [openInput, setOpenInput] = useState(false)
   const [body, setBody] = useState('')
   const [attachment, setAttachment] = useState([])
   const { user } = useSelector(selectUser)
   const { userTyping } = useSelector(selectIsTyping)
   const { userProfile } = useSelector(selectMessageUserProfile)
   const { message, messageOffset, messageLimit, messageError } =
      useSelector(selectMessage)

   // USE EFFECT THAT MONITOR THE USER IF LOGIN OR NOT
   if (!user?.id) {
      navigate('/')
   }
   // USE EFFECT THAT CONTROL THE THE INPUT SHOW
   useEffect(() => {
      setOpenInput(true)
      return () => {
         setOpenInput(false)
         dispatch(clearRoomProfile())
      }
   }, [])
   // USE EFFECT THAT CONTROL THE AUTO SCROLL
   useEffect(() => {
      scrollEnd.current?.scrollIntoView()
   }, [message, onInputFocus])
   // MONITORING THE RECEIVE MESSAGES AN INSERT TO CHAT
   useEffect(() => {
      if (isFetch.current === false) {
         // USING SOCKET TO INSERT MESSAGES
         socket.on(user?.id, (data) => {
            dispatch(insertMessage(data))
            dispatch(insertMessages(data))
            dispatch(
               countAllUnreadMessages({ token: user.token, user_id: user.id })
            )
         })
      }
      return () => {
         isFetch.current = true
      }
   }, [])
   // USE EFFECT THE LISTENING TO SOCKET WHEN WE RECEIVE
   // WAITING FOR DATA TO UPDATE THE SOCKET ISTYPING DATA
   useEffect(() => {
      let debounceId = null
      socket.on(`${user.id}/isTyping`, (data) => {
         if (data.isTyping) {
            dispatch(setIsTypingToTrue(data))
         } else {
            dispatch(setIsTypingToFalse(data))
         }
         scrollEnd.current?.scrollIntoView()
      })
      return () => {
         clearTimeout(debounceId)
      }
   }, [socket])
   // USE EFFECT THAT UPDATE AND SENDING SOCKET IS TYPING MESSAGE
   // SENDING DATA TO VIA SOCKET.IO TO UPDATE THE REDUX IS TYPING STATE
   useEffect(() => {
      let debounceId
      const timerId = setTimeout(() => {
         socket.emit('isTyping', {
            isTyping: body ? true : false,
            user_id: user.id,
            receiverId: userProfile.id,
         })
         debounceId = setTimeout(() => {
            socket.emit('isTyping', {
               isTyping: false,
               user_id: user.id,
               receiverId: userProfile.id,
            })
         }, 3000)
      }, 500)
      return () => {
         clearTimeout(timerId)
         clearTimeout(debounceId)
      }
   }, [body])
   // USE EFFECT THAT THAT IN CHARGE OF GETTING USER PROFILE CURRENT
   // AND GETTING THE ROOM MESSAGES
   // COUNTING THE UNREAD MESSAGES DYNAMITICALLY
   useEffect(() => {
      const fetchSync = async () => {
         if (isFetch.current === true) {
            await dispatch(
               getMessageUserProfile({ user_id: params.id, token: user.token })
            )
            await dispatch(
               getRoomMessages({
                  offset: messageOffset,
                  limit: messageLimit,
                  token: user.token,
                  user_id: params.id,
               })
            )
            await dispatch(
               countAllUnreadMessages({ token: user.token, user_id: user.id })
            )
         }
      }
      fetchSync()
      return () => {
         isFetch.current = true
      }
   }, [params?.id, messageLimit, messageOffset, user, dispatch])

   // ON SEND MESSAGE HANDLER IN CHARGE OF SENDING MESSAGE
   const onSendHandler = async (e) => {
      e.preventDefault()
      e.stopPropagation()
      const checkBody = Boolean(body.trim())
      if (!checkBody && user.id !== params.id) {
         setBody('')
         return
      }
      const data = {
         body,
         attachment: attachment.length > 0 ? attachment.join(',') : '',
         receiver: params.id,
      }
      await dispatch(sendMessage({ data, token: user.token }))
      setBody('')
   }
   return (
      <div className='flex gap-11'>
         <div
            id='messages'
            className='flex-1 max-h-[80vh] overflow-y-auto pt-[80px]'
         >
            {messageError || message?.length < 1 ? (
               <AttentionMessage
                  title={`Are you interested to ${userProfile?.username}`}
               >
                  <p>
                     Send {userProfile?.sex === 'Male' ? 'him' : 'her'} your
                     message that interested to connect.
                  </p>
                  <p>
                     And connect maybe{' '}
                     {userProfile?.sex === 'Male' ? 'his' : 'shes'} the one you
                     you're waiting for.
                  </p>
                  <p>
                     For more info view{' '}
                     {userProfile?.sex === 'Male' ? 'his' : 'her'} profile.
                  </p>
                  <div className='mt-5'>
                     <Link to={`/profile/${userProfile?.username}`}>
                        <PrimaryButton add='from-secondary bg-primary'>
                           <h3>View</h3>
                           <Avatar image={userProfile?.avatar} />{' '}
                           <h3>{userProfile?.username}</h3>
                        </PrimaryButton>
                     </Link>
                  </div>
               </AttentionMessage>
            ) : (
               <>
                  {message.map((content) => {
                     if (content.user_id !== user.id) {
                        return (
                           <LeftMessage
                              key={content.id}
                              profile={userProfile}
                              message={content}
                           >
                              {content.body}
                           </LeftMessage>
                        )
                     } else {
                        return (
                           <RightMessage
                              key={content.id}
                              profile={user}
                              message={content}
                           >
                              {content.body}
                           </RightMessage>
                        )
                     }
                  })}
               </>
            )}
            {userTyping ? (
               <LeftMessage profile={userProfile}>
                  <div className='relative h-6 min-w-[90px] flex justify-between pr-4'>
                     <small>Typing</small>
                     <span className='typing'></span>
                  </div>
               </LeftMessage>
            ) : null}
            <div ref={scrollEnd} />
         </div>
         <div className='hidden lg:block '>
            <MessageProfileCard />
            <div className='roundex-2xl w-[350px] h-auto rounded-2xl p-5 border border-darker'>
               <div className='flex justify-between p-3'>
                  <h3 className='text-light'>Messages</h3>
                  <Link to='/messages'>
                     <h3 className='text-light hover:text-secondary'>
                        View All
                     </h3>
                  </Link>
               </div>
               <Messages />
            </div>
         </div>
         {!openInput ? null : (
            <MessageFormInput
               onSubmit={onSendHandler}
               attachment={(item) =>
                  setAttachment((currentValues) => [...currentValues, item])
               }
               onFocus={() => setOnInputFocus(!onInputFocus)}
               body={body}
               onChange={(e) => setBody(e.target.value)}
            />
         )}
      </div>
   )
}

export default MessagePage
