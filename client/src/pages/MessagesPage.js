import React from 'react'
import { useSelector } from 'react-redux'
import MessageItem from '../components/MessageItem'
import { selectUsers } from '../store/features/users/usersSlice'

const MessagesPage = () => {
   const { users } = useSelector(selectUsers)
   const url = useSelector((state) => state.url)
   return (
      <div className='flex flex-col gap-4'>
         {users?.map((message) => (
            <MessageItem
               key={message.id}
               image={url + message.avatar}
               isOnline={message.isOnline}
               isRead={message.isRead}
            />
         ))}
      </div>
   )
}

export default MessagesPage
