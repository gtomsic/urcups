import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { serviceGetUserProfile } from '../../store/features/messages/serviceMessages'
import { selectUser } from '../../store/features/user/userSlice'

const MessageItem = ({ message, body, time }) => {
   const isFetch = useRef(false)
   const [profile, setProfile] = useState({})
   const { user } = useSelector(selectUser)
   const url = useSelector((state) => state.url)
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
   return (
      <Link to={`/messages/${message.user_id}`}>
         <div
            className={
               message.isRead
                  ? 'rounded-xl z-10 relative bg-gradient-to-tr from-gray  bg-dark flex gap-3 items-center overflow-hidden text-white'
                  : 'rounded-xl z-10 relative bg-gradient-to-tr from-secondary  bg-primary flex gap-3 items-center overflow-hidden text-white'
            }
         >
            <div
               className='relative w-[70px] h-[70px] rounded-r-full m-[-10px] border-2 border-white mr-1'
               style={{
                  backgroundImage: `url(${url + profile?.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
               }}
            >
               {profile?.isOnline ? (
                  <>
                     <span
                        className={`z-10 absolute bottom-3 right-[-4px] w-3 h-3 border-2 border-white rounded-full ${
                           profile?.isOnline ? 'bg-secondary' : 'bg-gray'
                        }`}
                     ></span>
                     <span className='z-0 animate-ping absolute bottom-3 right-[-4px] w-3 h-3 inline-flex rounded-full bg-white opacity-95'></span>
                  </>
               ) : null}
            </div>
            <div className='flex flex-col flex-1 mr-3'>
               <div className='flex justify-between items-center text-white'>
                  <h5>
                     {profile?.username} / {profile?.age}
                  </h5>
                  <span className='text-[10px] '>{moment(time).fromNow()}</span>
               </div>
               <p className='text-sm text-light'>
                  {body.split('').length > 20
                     ? body.split('').splice(0, 20).join('') + '...'
                     : body}
               </p>
            </div>
         </div>
      </Link>
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
