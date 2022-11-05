import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import urcups from '../assets/avatar.jpg'
import { selectUser } from '../store/features/user/userSlice'

const UserProfile = () => {
   const { user } = useSelector(selectUser)
   const url = useSelector((state) => state.url)
   const address =
      `${user?.city}, ${user?.stateProvince}, ${user?.country}`.split('')
         .length > 30
         ? `${user?.city}, ${user?.stateProvince}, ${user?.country}`
              .split('')
              .splice(0, 30)
              .join('') + '...'
         : `${user?.city}, ${user?.stateProvince}, ${user?.country}`
   return (
      <Link to={`/profile/${user?.username}`}>
         <div className='flex  gap-3  items-center justify-center bg-gradient-to-tr from-secondary  to-primary p-5 rounded-xl mb-5'>
            <div
               className='relative w-[70px] h-[70px] rounded-full border-4 border-white mr-1'
               style={{
                  backgroundImage: `url(${url + user?.avatar})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
               }}
            >
               {user?.isOnline ? (
                  <>
                     <span className='z-10 absolute bottom-[7px] right-[-4px] w-4 h-4 border-4 border-white rounded-full bg-secondary'></span>
                     <span className='animate-ping z-0 absolute bottom-[7px] right-[-4px] w-4 h-4  inline-flex rounded-full bg-white opacity-75'></span>
                  </>
               ) : null}
            </div>

            <div className='flex-1 hidden xl:flex flex-col text-white'>
               <h4 className='text-white'>{user?.username}</h4>
               <small>
                  {user?.age} / {user?.sexualOrientation}
               </small>
               <small>{address}</small>
            </div>
         </div>
      </Link>
   )
}

UserProfile.defaultProps = {
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

export default UserProfile
