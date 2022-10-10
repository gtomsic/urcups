import React from 'react'
import { useSelector } from 'react-redux'

import UserProfile from '../components/UserProfile'
import { selectUser } from '../store/features/user/userSlice'

// backdrop-blur-2xl backdrop-filter backdrop-opacity-90

const LeftBar = ({ children }) => {
   const { user } = useSelector(selectUser)
   return (
      <div className=' rounded-2xl bg-darker lg:pt-4 lg:bg-none lg:bg-opacity-0 flex flex-row md:flex-col gap-5 left-bar fixed z-30 left-[50%] translate-x-[-50%] lg:left-0 lg:translate-x-0 bottom-3 lg:bottom-0 lg:relative md:col-span-1 lg:col-span-1 xl:col-span-3'>
         {user?.id ? (
            <div className='hidden lg:block'>
               <UserProfile user={user} />
            </div>
         ) : null}
         {children}
      </div>
   )
}

export default LeftBar
