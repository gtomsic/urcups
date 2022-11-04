import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

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
   selectMessage,
   selectMessageUserProfile,
   sendMessage,
} from '../store/features/messages/messagesSlice'
import { selectUser } from '../store/features/user/userSlice'
import AttentionMessage from '../components/AttentionMessage'
import MessageProfileCard from '../components/messages/MessageProfileCard'
import Messages from '../components/messages/Messages'
import Avatar from '../components/Avatar'
import {
   actionBells,
   readBell,
   selectBells,
} from '../store/features/bells/bellsSlice'
import { socket } from '../socket'

const MessagePage = () => {
   const isFetch = useRef(false)
   const scrollEnd = useRef(null)
   const params = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const location = useLocation()
   const [send, setSend] = useState(false)
   const [onInputFocus, setOnInputFocus] = useState(false)
   const [openInput, setOpenInput] = useState(false)
   const [body, setBody] = useState('')
   const [attachment, setAttachment] = useState([])
   const [userTyping, setUserTyping] = useState(false)
   const { user } = useSelector(selectUser)
   const { userProfile } = useSelector(selectMessageUserProfile)
   const { bellsOffset, bellsLimit } = useSelector(selectBells)
   const { message, messageOffset, messageLimit, messageSuccess } =
      useSelector(selectMessage)

   // USE EFFECT THAT MONITOR THE USER IF LOGIN OR NOT
   if (!user?.id) {
      localStorage.setItem('redirect', JSON.stringify(`/messages`))
      navigate('/auth')
   }

   useEffect(() => {
      const timerId = setTimeout(() => {
         socket.on(`${user?.id}/${params.id}/typing`, (data) => {
            setUserTyping(data.typing)
            scrollEnd.current?.scrollIntoView()
         })
      }, 5000)
      return () => {
         clearTimeout(timerId)
      }
   }, [])

   useEffect(() => {
      let insedeTimer
      const timerId = setTimeout(() => {
         socket.emit('typing', {
            typing: true,
            receiver: `${params.id}/${user?.id}/typing`,
         })
         insedeTimer = setTimeout(() => {
            socket.emit('typing', {
               typing: false,
               receiver: `${params.id}/${user?.id}/typing`,
            })
         }, 3000)
      }, 200)
      return () => {
         clearTimeout(timerId)
         clearTimeout(insedeTimer)
      }
   }, [body])

   useEffect(() => {
      const timerId = setTimeout(() => {
         dispatch(
            readBell({
               user_id: userProfile?.id,
               limit: bellsLimit,
               offset: bellsOffset,
               token: user?.token,
            })
         )
      }, 500)
      return () => {
         clearTimeout(timerId)
      }
   }, [userProfile])

   useEffect(() => {
      let time = userProfile?.isOnline ? 60000 * 10 : 0
      const timerId = setTimeout(() => {
         if (send === true) {
            dispatch(
               actionBells({
                  title: 'new message!',
                  link: `/messages/${user?.id}`,
                  user_id: userProfile?.id,
                  body: `sent you message.`,
                  token: user?.token,
               })
            )
         }
      }, time)
      return () => {
         clearTimeout(timerId)
      }
   }, [send, message])
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

   // USE EFFECT THAT THAT IN CHARGE OF GETTING USER PROFILE CURRENT
   // AND GETTING THE ROOM MESSAGES
   // COUNTING THE UNREAD MESSAGES DYNAMITICALLY
   useEffect(() => {
      const fetchSync = async () => {
         if (isFetch.current === true) {
            await dispatch(
               getMessageUserProfile({ user_id: params.id, token: user?.token })
            )
            await dispatch(
               getRoomMessages({
                  offset: messageOffset,
                  limit: messageLimit,
                  token: user?.token,
                  user_id: params.id,
               })
            )
            await dispatch(
               countAllUnreadMessages({ token: user?.token, user_id: user.id })
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
      await dispatch(sendMessage({ data, token: user?.token }))
      socket.emit('typing', {
         typing: false,
         receiver: `${params.id}/${user?.id}/typing`,
      })
      setSend(true)
      setBody('')
   }
   return (
      <div className='flex gap-8'>
         <div
            id='messages'
            className='flex-1 h-[80vh] overflow-y-auto pt-[80px]'
         >
            {message?.length < 1 ? (
               <AttentionMessage
                  title={`Are you interested to ${userProfile?.username}`}
               >
                  <p>
                     Send {userProfile?.sex === 'Male' ? 'him' : 'her'} your
                     message to start conversation.
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
