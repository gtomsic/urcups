import React, { useEffect, useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../../components/Button'
import Card from '../../components/Card'
import SelectOptions from '../../components/forms/SelectOptions'
import UserCard from '../../components/UserCard'
import { logout, selectUser } from '../../store/features/user/userSlice'
import { selectUsers } from '../../store/features/users/usersSlice'

const ProfileSettings = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { user } = useSelector(selectUser)
   const { users } = useSelector(selectUsers)
   const [status, setStatus] = useState(user?.status)
   const price = [
      { price: 20, label: '3 Months' },
      { price: 30, label: '6 Months' },
      { price: 50, label: '1 year' },
   ]
   const logoutHandler = () => {
      dispatch(logout(user.id))
   }
   useEffect(() => {
      if (!user?.id) {
         navigate('/')
      }
   }, [user, navigate])
   return (
      <div className='flex flex-col gap-20'>
         <Card>
            <div className='flex flex-col gap-3'>
               <h3>General Settings</h3>
               <div className='grid grid-cols-1 gap-11 lg:gap-5 lg:grid-cols-2'>
                  <div className='flex flex-col gap-11'>
                     <div>
                        <h3>Free accounts</h3>
                        <ul>
                           <li>All free account can enjoy unlimited chat.</li>
                           <li>You can views unlimited user profile.</li>
                           <li>Limited to 2 private messages a day.</li>
                           <li>Not allowed to view public photos.</li>
                           <li>
                              Not allowed to interact and view readers activity.
                           </li>
                           <li>Not allowed to block any users.</li>
                        </ul>
                     </div>
                     <div>
                        <h3>Values for supporters</h3>
                        <ul>
                           <li>
                              Supported member can have unlimited private
                              messages.
                           </li>
                           <li>Supported member can view public photos.</li>
                           <li>Supported member can bookmark user profile.</li>
                           <li>
                              Supported member can view likes and comment to
                              reader's activity.
                           </li>
                        </ul>
                     </div>
                     <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
                        {price.map((support) => (
                           <div
                              key={support.price}
                              className='flex flex-col gap-1 p-5 justify-center items-center cursor-pointer rounded-lg bg-gradient-to-bl from-primary bg-secondary hover:bg-danger duration-300'
                           >
                              <h3>${support.price} USD</h3>
                              <p>{support.label}</p>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className='flex flex-col gap-11'>
                     <SelectOptions
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        label='Active Status'
                        data={[{ name: 'Online' }, { name: 'Hide Status' }]}
                        bg={
                           status === true || status !== 'Online'
                              ? 'bg-white text-dark'
                              : 'bg-secondary text-white'
                        }
                     />
                     <Link to={`/profile/${user?.username}/edit`}>
                        <Button color='bg-gradient-to-tr from-secondary bg-accent hover:bg-primary hover:from-dark'>
                           <FaUserEdit /> Edit Profile
                        </Button>
                     </Link>
                     <Button
                        onClick={logoutHandler}
                        color='bg-gradient-to-tr from-primary bg-danger hover:from-warning'
                     >
                        <IoLogOut /> Logout
                     </Button>
                  </div>
               </div>
            </div>
         </Card>
         <Card>
            <div className='flex justify-between'>
               <h3>Favorite Users</h3>
               <h3 className='text-white'>View All 89</h3>
            </div>
            <div className='grid grid-cols-3 gap-1 md:gap-3 sm:grid-cols-4 md:grid-cols-6 lg-grid-cols-3 xl:grid-cols-6'>
               {users?.map((user) => (
                  <UserCard
                     key={user.id}
                     wallpaper={user.wallpaper}
                     image={user.thumbnail}
                     age={user.age}
                     username={user.username}
                     location={user.location}
                     isOnline={user.isOnline}
                  />
               ))}
            </div>
         </Card>
         <Card>
            <div className='flex justify-between'>
               <h3>Block Users</h3>
               <h3 className='text-white'>View All 128</h3>
            </div>
            <div className='grid grid-cols-3 gap-1 md:gap-3 sm:grid-cols-4 md:grid-cols-6 lg-grid-cols-3 xl:grid-cols-6'>
               {users?.map((user) => (
                  <UserCard
                     key={user.id}
                     wallpaper={user.wallpaper}
                     image={user.thumbnail}
                     age={user.age}
                     username={user.username}
                     location={user.location}
                     isOnline={user.isOnline}
                  />
               ))}
            </div>
         </Card>
      </div>
   )
}

export default ProfileSettings