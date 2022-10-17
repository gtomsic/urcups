import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BsShieldLockFill } from 'react-icons/bs'
import { MdMessage } from 'react-icons/md'

import Avatar from '../components/Avatar'
import Logo from '../components/Logo'
import SearchInput from '../components/SearchInput'
import { selectUser } from '../store/features/user/userSlice'
import { selectUnreadMessages } from '../store/features/messages/messagesSlice'

const Header = () => {
   const { user } = useSelector(selectUser)
   const navigate = useNavigate()
   const { unreadMessages } = useSelector(selectUnreadMessages)
   const MessagesNote = () => {
      return (
         <div
            onClick={() => navigate('/messages')}
            className='p-1 lg:p-3 text-3xl lg:text-xl flex items-center text-white cursor-pointer lg:hidden'
         >
            <div className='relative'>
               <MdMessage />
               {unreadMessages > 0 ? (
                  <span className='absolute text-xs bg-danger px-1 rounded-full top-[-10px] text-white left-2'>
                     {unreadMessages}
                  </span>
               ) : null}
            </div>
         </div>
      )
   }
   return (
      <header className='fixed top-0 py-3 w-full z-40 backdrop-blur-3xl backdrop-filter backdrop-opacity-95'>
         <div className='flex justify-between items-center mx-auto md:max-w-[98%] lg:max-w-[90%] xl:max-w-[80%] px-3 gap-2'>
            <Link to='/'>
               <Logo />
            </Link>
            <SearchInput />
            <div>
               {user?.id ? (
                  <div className='flex items-center gap-2'>
                     <MessagesNote />
                     <Link to={`/profile/${user?.username}`}>
                        <Avatar
                           image={user?.thumbnail}
                           border={false}
                           isOnline={user?.isOnline}
                        />
                     </Link>
                  </div>
               ) : (
                  <Link to='/auth'>
                     <div className='w-10 h-10 rounded-full flex justify-center items-center bg-primary text-white'>
                        <BsShieldLockFill />
                     </div>
                  </Link>
               )}
            </div>
         </div>
      </header>
   )
}

export default Header
