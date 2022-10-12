import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBell, FaUserPlus } from 'react-icons/fa'
import { BsShieldLockFill } from 'react-icons/bs'
import { MdMessage } from 'react-icons/md'
import { IoMdChatboxes } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'
import { HiUsers } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../store/features/user/userSlice'
import Button from './Button'

const MenuItems = () => {
   const location = useLocation()
   const dispatch = useDispatch()
   const { user } = useSelector(selectUser)
   const url = useSelector((state) => state.url)
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
                        ? 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-danger'
                        : 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-danger duration-300'
                  }
               >
                  <div className='relative'>
                     <HiUsers />
                  </div>
                  <div className='hidden xl:block'>Users</div>
               </div>
            </Link>
            {user?.id ? (
               <>
                  <Link to='/notifications'>
                     <div
                        className={
                           location.pathname === '/notifications'
                              ? 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-danger'
                              : 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-danger duration-300'
                        }
                     >
                        <div className='relative'>
                           <FaBell />
                           <span className='absolute text-xs bg-danger px-1 rounded-full top-[-10px] text-white left-2'>
                              17
                           </span>
                        </div>
                        <div className='hidden xl:block'>Notifications</div>
                     </div>
                  </Link>
                  <Link to='/messages'>
                     <div
                        className={
                           location.pathname === '/messages'
                              ? 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-danger'
                              : 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-danger duration-300'
                        }
                     >
                        <div className='relative'>
                           <MdMessage />
                           <span className='absolute text-xs bg-danger px-1 rounded-full top-[-10px] text-white left-2'>
                              3
                           </span>
                        </div>
                        <div className='hidden xl:block'>Messages</div>
                     </div>
                  </Link>
                  <Link to='/chats'>
                     <div
                        className={
                           location.pathname === '/chats'
                              ? 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-danger'
                              : 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-danger duration-300'
                        }
                     >
                        <div className='relative'>
                           <IoMdChatboxes />
                        </div>
                        <div className='hidden xl:block'>Chats</div>
                     </div>
                  </Link>
                  <Link to={`/profile/${user?.username}`}>
                     <div
                        className={
                           location.pathname === `/profile/${user?.username}` ||
                           location.pathname ===
                              `/profile/${user?.username}/photos` ||
                           location.pathname ===
                              `/profile/${user?.username}/private` ||
                           location.pathname ===
                              `/profile/${user?.username}/reader` ||
                           location.pathname ===
                              `/profile/${user?.username}/private` ||
                           location.pathname ===
                              `/profile/${user?.username}/settings`
                              ? 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-danger'
                              : 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-danger duration-300'
                        }
                     >
                        <div
                           className='relative h-[30px] w-[30px] lg:w-5 lg:h-5 rounded-full'
                           style={{
                              backgroundImage: `url(${url + user?.thumbnail})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                           }}
                        ></div>
                        <div className='hidden xl:block'>{user?.username}</div>
                     </div>
                  </Link>
               </>
            ) : (
               <>
                  <Link to='/auth'>
                     <div
                        className={
                           location.pathname === '/auth'
                              ? 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-danger'
                              : 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-danger duration-300'
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
                              ? 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-danger'
                              : 'py-4 gap-3 px-4 md:px-5 text-3xl lg:text-xl flex items-center text-white border-b-8 lg:border-b-0 lg:border-l-8  border-white hover:border-danger duration-300'
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
