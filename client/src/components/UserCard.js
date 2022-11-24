import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function UserCard({ user }) {
   const url = useSelector((state) => state.url);
   const [timeAgo, setTimeAgo] = useState({
      time: user?.updatedAt,
      isOnline: user?.isOnline,
   });
   useEffect(() => {
      setTimeAgo({ time: user?.updatedAt, isOnline: user?.isOnline });
   }, []);
   return (
      <div
         className={
            user?.isOnline
               ? 'relative group overflow-hidden rounded-3xl p-4 bg-gradient-to-b from-primary to-dark hover:from-primary hover:to-danger pb-[150px]'
               : 'relative group overflow-hidden rounded-3xl p-4 bg-gradient-to-b from-darker to-dark hover:from-primary hover:to-danger  pb-[150px]'
         }
      >
         <div
            className='relative text-white rounded-2xl h-[300px] cursor-pointer overflow-hidden'
            style={{
               backgroundImage: `url(${url + user?.avatar})`,
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
            }}
         ></div>
         <div
            className={
               user?.isOnline
                  ? 'absolute bg-gradient-to-t from-primary group-hover:from-primary duration-300 bottom-0 left-0 w-full h-[130px] flex flex-col justify-end text-white'
                  : 'absolute bg-gradient-to-t from-dark group-hover:from-primary duration-300  bottom-0 left-0 w-full h-[130px] flex flex-col justify-end text-white'
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
            <div className='relative flex justify-center gap-1 pb-5'>
               {user?.isOnline ? (
                  <div className='relative w-10'>
                     <span className='z-10 absolute right-0 top-1 w-4 h-4 border-2 border-white rounded-full bg-secondary'></span>
                     <span className='animate-ping z-0 absolute right-0 top-1 w-4 h-4  inline-flex rounded-full bg-white opacity-75'></span>
                  </div>
               ) : null}
               <div>
                  <small>
                     {`${user?.isOnline ? 'Online' : 'Offline'} ${moment(
                        timeAgo.time
                     ).fromNow()}`}{' '}
                  </small>
               </div>
            </div>
         </div>
      </div>
   );
}

export default UserCard;
