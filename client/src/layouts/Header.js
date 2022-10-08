import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsShieldLockFill } from 'react-icons/bs'

import Avatar from '../components/Avatar'
import Logo from '../components/Logo'
import SearchInput from '../components/SearchInput'
import { selectUser } from '../store/features/user/userSlice'

const Header = () => {
   const { user } = useSelector(selectUser)
   return (
      <header className='fixed top-0 py-3 w-full z-40 backdrop-blur-xl backdrop-filter backdrop-opacity-95'>
         <div className='flex justify-between items-center mx-auto md:max-w-[98%] lg:max-w-[90%] xl:max-w-[80%] px-3'>
            <Logo />
            <SearchInput />
            <div>
               {user?.id ? (
                  <Link to={`/profile/${user?.username}`}>
                     <Avatar
                        image={user?.thumbnail}
                        border={false}
                        isOnline={user?.isOnline}
                     />
                  </Link>
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
