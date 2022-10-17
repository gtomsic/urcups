import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import urcups from '../assets/avatar.jpg'

const MessageItem = ({ user }) => {
   const url = useSelector((state) => state.url)
   return (
      <Link to={`/profile/${user?.username}`}>
         <div className='rounded-xl z-10 py-5 xl:py-0 relative xl:bg-gradient-to-tr from-secondary bg-primary flex justify-center  gap-3  text-white'>
            <div
               className='relative w-11 h-11 xl:w-[70px] xl:h-[70px] rounded-full xl:rounded-r-full xl:rounded-b-full xl:mt-[-15px] xl:ml-[-15px] xl:border-4 border-white mr-1'
               style={{
                  backgroundImage: `url(${url + user.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
               }}
            >
               {user.isOnline ? (
                  <>
                     <span className='z-10 absolute bottom-[7px] right-[-4px] w-4 h-4 border-4 border-white rounded-full bg-secondary'></span>
                     <span className='animate-ping z-0 absolute bottom-[7px] right-[-4px] w-4 h-4  inline-flex rounded-full bg-white opacity-75'></span>
                  </>
               ) : null}
            </div>
            <div className='flex-col flex-1 mr-2 hidden xl:flex pb-3 pt-2'>
               <div className='flex justify-between items-center text-white'>
                  <h3>
                     {user.username}/{user.age}
                  </h3>
                  <span className='text-[10px]'>{user.time}</span>
               </div>
               <p>{`${user.city}, ${user.stateProvince}, ${user.country}`}</p>
            </div>
         </div>
      </Link>
   )
}

MessageItem.defaultProps = {
   user: {
      avatar: urcups,
      username: 'urcups',
      age: 39,
      time: '1m ago',
      hugot: 'Your tagline here...',
      isOnline: true,
      isRead: true,
   },
}

export default MessageItem
