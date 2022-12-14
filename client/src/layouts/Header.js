import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsShieldLockFill } from 'react-icons/bs'

import Avatar from '../components/Avatar'
import Logo from '../components/Logo'
import urcups from '../assets/urcups256.png'
import { selectUser } from '../store/features/user/userSlice'

const Header = () => {
   const { user } = useSelector(selectUser)
   const location = useLocation()
   const navigate = useNavigate()
   return (
      <header className='sticky top-0 py-3 w-full z-40 backdrop-blur-3xl backdrop-filter backdrop-opacity-95'>
         <div className='flex justify-between items-center mx-auto md:max-w-[98%] lg:max-w-[90%] xl:max-w-[80%] px-3 gap-2'>
            <Link to='/'>
               <Logo />
            </Link>
            {location.pathname !== '/' ? (
               <img
                  onClick={() => navigate('/')}
                  src={urcups}
                  alt='urcups logo'
                  className='w-[100px] cursor-pointer'
               />
            ) : null}
            <div>
               {user?.id ? (
                  <div className='flex items-center gap-2'>
                     {/* <MessagesNote /> */}
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
