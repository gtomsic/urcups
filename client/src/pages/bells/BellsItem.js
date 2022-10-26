import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { MdClose } from 'react-icons/md'

const BellsItem = ({ user }) => {
   const url = useSelector((state) => state.url)
   return (
      <div className='relative rounded-3xl bg-gradient-to-tr from-primary to-secondary flex gap-2 overflow-hidden cursor-pointer'>
         <img
            src={url + user.avatar}
            alt={user.avatar}
            className='max-h-[100px]'
         />
         <div className='my-2 text-white'>
            <h4>{user.username}</h4>
            <p>Just view your profile</p>
            <small>{moment(user.updatedAt).fromNow()}</small>
         </div>
         <div className='absolute top-2 right-2 p-2 rounded-full border border-white text-white hover:bg-danger duration-300 cursor-pointer'>
            <MdClose />
         </div>
      </div>
   )
}

export default BellsItem
