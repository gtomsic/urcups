import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBell, FaUserPlus } from 'react-icons/fa'
import { BsShieldLockFill } from 'react-icons/bs'
import { MdMessage } from 'react-icons/md'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { MdAutoStories } from 'react-icons/md'
import { IoLogOut } from 'react-icons/io5'
import { HiUsers } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../store/features/user/userSlice'
import Button from './Button'
import { selectUnreadMessages } from '../store/features/messages/messagesSlice'
import { countBells, selectBells } from '../store/features/bells/bellsSlice'
import { socket } from '../socket'

const MenuItems = () => {
   const location = useLocation()
   const dispatch = useDispatch()
   const { user } = useSelector(selectUser)
   const { unreadMessages } = useSelector(selectUnreadMessages)
   const { bellsOffset, bellsLimit, count } = useSelector(selectBells)
   useEffect(() => {
      if (!user?.id) return
      const timerId = setTimeout(() => {
         dispatch(
            countBells({
               token: user?.token,
            })
         )
      }, 500)
      return () => {
         clearTimeout(timerId)
      }
   }, [user, bellsLimit, bellsOffset])

   const logoutHandler = async () => {
      const localUser = JSON.parse(localStorage.getItem('user'))
      socket.emit('user', { ...localUser, isOnline: false })
      await dispatch(logout(user.id))
   }
   return (
      <div className='sticky top-[85px]'>
         <div className='bg-gradient-to-tr from-primary bg-secondary z-0 flex flex-row lg:flex-col relative rounded-2xl overflow-hidden'>
            <Link to='/'>
               <div
                  className={
                     location.pathname === '/'
                        ? 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-primary'
                        : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-primary duration-300'
                  }
               >
                  <div className='relative'>
                     <HiUsers />
                  </div>
                  <div className='hidden xl:block'>Users</div>
               </div>
            </Link>
            <Link to={`/stories`}>
               <div
                  className={
                     location.pathname === `/stories`
                        ? 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-primary'
                        : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-primary duration-300'
                  }
               >
                  <div className='relative '>
                     <MdAutoStories />
                  </div>
                  <div className='hidden xl:block'>Stories</div>
               </div>
            </Link>
            {user?.id ? (
               <>
                  <Link to='/bells'>
                     <div
                        className={
                           location.pathname === '/bells'
                              ? 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-primary'
                              : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-primary duration-300'
                        }
                     >
                        <div className='relative'>
                           <FaBell />
                           {count > 0 ? (
                              <span className='absolute text-xs bg-danger px-1 rounded-full top-[-10px] text-white left-2'>
                                 {count}
                              </span>
                           ) : null}
                        </div>
                        <div className='hidden xl:block'>Bells</div>
                     </div>
                  </Link>
                  <Link to='/messages'>
                     <div
                        className={
                           location.pathname === '/messages'
                              ? 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-primary'
                              : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-primary duration-300'
                        }
                     >
                        <div className='relative'>
                           <MdMessage />
                           {unreadMessages > 0 ? (
                              <span className='absolute text-xs bg-danger px-1 rounded-full top-[-10px] text-white left-2'>
                                 {unreadMessages}
                              </span>
                           ) : null}
                        </div>
                        <div className='hidden xl:block'>Messages</div>
                     </div>
                  </Link>
                  <Link to='/favorites'>
                     <div
                        className={
                           location.pathname === '/favorites'
                              ? 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-primary'
                              : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-primary duration-300'
                        }
                     >
                        <div className='relative'>
                           <BsBookmarkStarFill />
                        </div>
                        <div className='hidden xl:block'>Favorites</div>
                     </div>
                  </Link>
               </>
            ) : (
               <>
                  <Link to='/auth'>
                     <div
                        className={
                           location.pathname === '/auth'
                              ? 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-primary'
                              : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-primary duration-300'
                        }
                     >
                        <div className='relative'>
                           <BsShieldLockFill />
                        </div>
                        <div className='hidden xl:block'>Login</div>
                     </div>
                  </Link>
                  <Link to='/auth/register'>
                     <div
                        className={
                           location.pathname === '/auth/register'
                              ? 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-primary'
                              : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-primary duration-300'
                        }
                     >
                        <div className='relative'>
                           <FaUserPlus />
                        </div>
                        <div className='hidden xl:block'>Signup</div>
                     </div>
                  </Link>
               </>
            )}
         </div>

         {user?.id ? (
            <Button
               onClick={logoutHandler}
               color='bg-gradient-to-tr from-primary to-danger hover:from-primary hover:to-secondary hidden mt-5 lg:flex'
            >
               <IoLogOut /> <div className='hidden xl:block'>Logout</div>
            </Button>
         ) : null}
      </div>
   )
}

export default MenuItems
