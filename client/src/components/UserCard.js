import React from 'react'

import { BsBookmarkStarFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

function UserCard({ user }) {
   const url = useSelector((state) => state.url)
   // const image = user?.avatar.includes('/avatar.jpg')
   //    ? user?.avatar
   //    : user.avatar.replace('avatar', 'avatar')
   return (
      <div className='rounded-3xl p-2 bg-gradient-to-tr from-secondary'>
         <div
            className='relative bg-gradient-to-tr from-secondary to-primary  text-white rounded-2xl h-[250px] cursor-pointer overflow-hidden'
            style={{
               backgroundImage: `url(${url + user?.avatar})`,
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
            }}
         >
            <div
               className={
                  user?.isOnline
                     ? 'absolute bg-gradient-to-t from-secondary hover:from-primary duration-300 bottom-0 w-full h-[130px] flex flex-col justify-end'
                     : 'absolute bg-gradient-to-t from-dark hover:from-primary duration-300  bottom-0 w-full h-[130px] flex flex-col justify-end'
               }
            >
               <div className='mt-5 pb-5 flex justify-around'>
                  <div className='flex flex-col'>
                     <div className='flex gap-2'>
                        <small>User:</small>
                        <small>{user?.username}</small>
                     </div>
                     <div className='flex gap-2'>
                        <small>Age:</small>
                        <small>{user?.age}</small>
                     </div>
                     <div className='flex gap-2'>
                        <small>SexOr:</small>
                        <small>{user?.sexualOrientation}</small>
                     </div>
                  </div>
                  <div className='flex flex-col'>
                     <div className='flex gap-2'>
                        <small>City:</small>
                        <small>{user?.city}</small>
                     </div>
                     <div className='flex gap-2'>
                        <small>State:</small>
                        <small>{user?.stateProvince}</small>
                     </div>
                     <div className='flex gap-2'>
                        <small>Country:</small>
                        <small>{user?.country}</small>
                     </div>
                  </div>
               </div>
            </div>
            {/* Favorite Tags */}
            {/* <div className='absolute top-0 bg-gradient-to-b from-primary text-3xl pt-5 px-1 h-full'>
            <BsBookmarkStarFill />
         </div> */}
            {user?.isOnline ? (
               <>
                  <span className='z-10 absolute top-5 right-5 w-6 h-6 border-4 border-white rounded-full bg-secondary'></span>
                  <span className='animate-ping z-0 absolute top-5 right-5 w-6 h-6  inline-flex rounded-full bg-white opacity-75'></span>
               </>
            ) : null}
         </div>
      </div>
   )
}

export default UserCard
