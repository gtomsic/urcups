import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5'

import PrimaryButton from '../components/PrimaryButton'
import MessageFormInput from '../components/MessageFormInput'
import RightMessage from '../components/messages/RightMessage'
import LeftMessage from '../components/messages/LeftMessage'
import { useDispatch, useSelector } from 'react-redux'
import {
   getMessageUserProfile,
   getRoomMessages,
   resetMessage,
   selectMessage,
   selectMessageUserProfile,
   sendMessage,
} from '../store/features/messages/messagesSlice'
import { selectUser } from '../store/features/user/userSlice'
import AttentionMessage from '../components/AttentionMessage'

const MessagePage = () => {
   const navigate = useNavigate()
   const params = useParams()
   const dispatch = useDispatch()
   const isFetch = useRef(false)
   const [onInputFocus, setOnInputFocus] = useState(false)
   const scrollEnd = useRef(null)
   let [roomOffset, setRoomOffset] = useState(0)
   const [openInput, setOpenInput] = useState(false)
   const [body, setBody] = useState('')
   const [attachment, setAttachment] = useState([])
   const { user } = useSelector(selectUser)
   const { userProfile } = useSelector(selectMessageUserProfile)
   const { message, messageLoading, messageError } = useSelector(selectMessage)
   useEffect(() => {
      setOpenInput(true)
      return () => {
         setOpenInput(false)
      }
   }, [])
   useEffect(() => {
      scrollEnd.current?.scrollIntoView()
   }, [message, onInputFocus])
   useEffect(() => {
      const fetchMessagesWithProfile = async () => {
         await dispatch(
            getMessageUserProfile({ user_id: params.id, token: user.token })
         )
         await dispatch(
            getRoomMessages({
               offset: 0,
               limit: 30,
               token: user.token,
               user_id: params.id,
            })
         )
      }
      if (isFetch.current === false) {
         fetchMessagesWithProfile()
      }
      return () => {
         isFetch.current = true
      }
   }, [params?.id])
   const onBackHandler = (e) => {
      e.stopPropagation()
      navigate(-1)
   }
   const onSendHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      const checkBody = Boolean(body.trim())
      if (!checkBody) {
         setBody('')
         return
      }
      const data = {
         body,
         attachment: attachment.length > 0 ? attachment.join(',') : '',
         receiver: params.id,
      }
      console.log(data)
      dispatch(sendMessage({ data, token: user.token }))
      setBody('')
   }
   return (
      <div className='flex gap-11'>
         <div
            id='messages'
            className='flex-1 max-h-[80vh] overflow-y-auto py-[80px]'
         >
            <div className='fixed z-20 top-[80px] md:top-[110px] ml-3 inline-block'>
               <PrimaryButton onClick={onBackHandler}>
                  <IoChevronBack /> BACK
               </PrimaryButton>
            </div>
            {message?.length <= 0 ? (
               <AttentionMessage title='Are you interested with user (Blablah)'>
                  <p>Send him/her your interested to the fullest.</p>
                  <p>
                     And connect maybe his/shes the one you you're waiting for.
                  </p>
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
            <div ref={scrollEnd} />
         </div>
         <div className='roundex-2xl w-[350px] max-h-[80vh] hidden lg:block bg-darker rounded-2xl p-5'>
            <h3>Messages</h3>
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
