import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { IoTrashOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { serviceGetUserProfile } from '../../store/features/messages/serviceMessages'
import { selectUser } from '../../store/features/user/userSlice'
import {
   getMessageUserProfile,
   getRoomMessages,
   selectMessage,
   updateIsReadMessage,
} from '../../store/features/messages/messagesSlice'

const MessageItem = ({ message, body, time }) => {
   const isFetch = useRef(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const url = useSelector((state) => state.url)
   const [profile, setProfile] = useState({})
   const { user } = useSelector(selectUser)
   const { messageLimit, messageOffset } = useSelector(selectMessage)
   useEffect(() => {
      const fetchUser = async () => {
         if (isFetch.current === false) {
            const response = await serviceGetUserProfile({
               user_id: message.user_id,
               token: user.token,
            })
            setProfile(response)
         }
      }
      if (isFetch.current === false) {
         fetchUser()
      }
      return () => {
         isFetch.current = true
      }
   }, [])
   const onClickHandler = async (e) => {
      e.stopPropagation()
      await dispatch(
         getMessageUserProfile({ user_id: message.user_id, token: user.token })
      )
      await dispatch(
         getRoomMessages({
            offset: messageOffset,
            limit: messageLimit,
            token: user.token,
            user_id: message.user_id,
         })
      )
      dispatch(updateIsReadMessage(message.user_id))
      navigate(`/messages/${message.user_id}`)
   }
   const onDeleteMessageHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log(message.id)
   }
   return (
      <div
         onClick={onClickHandler}
         className={`relative h-[100px] rounded-3xl overflow-hidden ${
            message.user_id === user.id
               ? true
               : message.isRead
               ? 'z-10 relative bg-gradient-to-tr from-dark  bg-darker flex gap-3 items-center overflow-hidden text-white cursor-pointer'
               : 'z-10 relative bg-gradient-to-tr from-primary  bg-secondary flex gap-3 items-center overflow-hidden text-white cursor-pointer'
         }`}
      >
         <div
            className='relative h-[100px] w-[70px] border-r-2 border-white mr-1'
            style={{
               backgroundImage: `url(${url + profile?.avatar})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
            }}
         >
            {profile?.isOnline ? (
               <>
                  <span
                     className={`z-10 absolute bottom-3 -right-[7px] w-3 h-3 border-2 border-white rounded-full ${
                        profile?.isOnline ? 'bg-secondary' : 'bg-gray'
                     }`}
                  ></span>
                  <span className='z-0 animate-ping absolute bottom-3 -right-[7px] w-3 h-3 inline-flex rounded-full bg-white opacity-95'></span>
               </>
            ) : null}
         </div>
         <div className='flex flex-col flex-1 mr-3 py-3'>
            <div className='flex justify-between items-center text-white'>
               <p className='text-xl lg:text-lg'>
                  {profile?.username} / {profile?.age}
               </p>
            </div>
            <p className='text-lg lg:text-lg text-light'>
               {body.split('').length > 15
                  ? body.split('').splice(0, 15).join('') + '...'
                  : body}
            </p>
            <small>{moment(time).fromNow()}</small>
         </div>
         <div
            onClick={onDeleteMessageHandler}
            className='border-l h-[100px] border-white w-8 flex justify-center items-center text-white bg-primary hover:bg-danger duration-300'
         >
            <IoTrashOutline />
         </div>
      </div>
   )
}

MessageItem.defaultProps = {
   image: '/avatar.jpg',
   time: '1m ago',
   body: 'Hello there how are you',
   isOnline: false,
   isRead: true,
}

export default MessageItem
