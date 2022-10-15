import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MessageItem from '../components/messages/MessageItem'
import { selectUsers } from '../store/features/users/usersSlice'

const MessagesPage = () => {
   const { users } = useSelector(selectUsers)
   const url = useSelector((state) => state.url)
   const navigate = useNavigate()
   const onClickHandler = (e, user_id) => {
      e.stopPropagation()
      navigate(`/messages/${user_id}`)
   }
   return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
         {users?.map((message) => (
            <div
               onClick={(e) => onClickHandler(e, message.id)}
               key={message.id}
               className='shadow-md hover:shadow-secondary rounded-xl'
            >
               <MessageItem
                  image={url + message.avatar}
                  isOnline={message.isOnline}
                  isRead={message.isRead}
               />
            </div>
         ))}
      </div>
   )
}

export default MessagesPage
