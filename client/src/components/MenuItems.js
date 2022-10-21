import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBell, FaUserPlus } from 'react-icons/fa'
import { BsShieldLockFill } from 'react-icons/bs'
import { MdMessage } from 'react-icons/md'
// import { IoMdChatboxes } from 'react-icons/io'
// import { BsBookmarkStarFill, BsBookmarkPlusFill, BsBookmarkXFill } from 'react-icons/bs'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { MdAutoStories } from 'react-icons/md'
import { IoLogOut } from 'react-icons/io5'
import { HiUsers } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../store/features/user/userSlice'
import Button from './Button'
import {
   countAllUnreadMessages,
   getAllMessages,
   readRoomMessages,
   selectAllMessages,
   selectUnreadMessages,
} from '../store/features/messages/messagesSlice'
import { socket } from '../socket'

const MenuItems = () => {
   const isFetch = useRef(false)
   const location = useLocation()
   const dispatch = useDispatch()
   const { user } = useSelector(selectUser)
   const url = useSelector((state) => state.url)
   const { messagesLimit, messagesOffset } = useSelector(selectAllMessages)
   const { unreadMessages } = useSelector(selectUnreadMessages)
   useEffect(() => {
      socket.on(user?.id, (msg) => {
         if (user?.id && msg.user_id !== user?.id) {
            dispatch(
               countAllUnreadMessages({
                  token: user?.token,
                  user_id: msg.user_id,
               })
            )
            dispatch(
               readRoomMessages({
                  token: user?.token,
                  user_id: msg.user_id,
                  roomId: msg.roomId,
               })
            )
            dispatch(
               getAllMessages({
                  offset: messagesOffset,
                  limit: messagesLimit,
                  token: user.token,
                  user_id: user.id,
               })
            )
         }
      })
      return () => {
         isFetch.current = true
      }
   }, [user, socket])
   const logoutHandler = () => {
      dispatch(logout(user.id))
   }
   return (
      <div className='sticky top-[85px]'>
         <div className='bg-gradient-to-tr from-primary bg-secondary z-0 flex flex-row lg:flex-col relative rounded-2xl overflow-hidden'>
            <Link to='/'>
               <div
                  className={
                     location.pathname === '/'
                        ? 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-primary'
                        : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-secondary duration-300'
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
                        : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-secondary duration-300'
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
                              : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-secondary duration-300'
                        }
                     >
                        <div className='relative'>
                           <FaBell />
                           <span className='absolute text-xs bg-danger px-1 rounded-full top-[-10px] text-white left-2'>
                              17
                           </span>
                        </div>
                        <div className='hidden xl:block'>Bells</div>
                     </div>
                  </Link>
                  <Link to='/messages'>
                     <div
                        className={
                           location.pathname === '/messages'
                              ? 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-primary'
                              : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-secondary duration-300'
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
                              : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-secondary duration-300'
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
                              : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-secondary duration-300'
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
                              : 'py-4 px-4 md:py-4 gap-3 md:px-3 xl:px-5 text-3xl lg:text-xl flex items-center lg:justify-center xl:justify-start text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-secondary duration-300'
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
               color='bg-gradient-to-bl from-primary bg-danger hover:from-warning hidden mt-5 lg:flex'
            >
               <IoLogOut /> <div className='hidden xl:block'>Logout</div>
            </Button>
         ) : null}
      </div>
   )
}

export default MenuItems
