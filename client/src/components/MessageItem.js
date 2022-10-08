import React from 'react';
import { Link } from 'react-router-dom';

import urcups from '../assets/avatar.jpg';

const MessageItem = ({
   image,
   username,
   age,
   message,
   time,
   isOnline,
   isRead,
}) => {
   return (
      <Link to='/messages'>
         <div
            className={
               isRead
                  ? 'rounded-xl z-10 relative bg-grayer flex gap-3 items-center overflow-hidden'
                  : 'rounded-xl z-10 relative bg-primary flex gap-3 items-center overflow-hidden text-white'
            }
         >
            <div
               className='relative w-[70px] h-[70px] rounded-r-full m-[-10px] border-2 border-white mr-1'
               style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
               }}
            >
               {isOnline ? (
                  <>
                     <span
                        className={`z-10 absolute bottom-3 right-[-4px] w-3 h-3 border-2 border-white rounded-full ${
                           isOnline ? 'bg-secondary' : 'bg-gray'
                        }`}
                     ></span>
                     <span className='z-0 animate-ping absolute bottom-3 right-[-4px] w-3 h-3 inline-flex rounded-full bg-white opacity-95'></span>
                  </>
               ) : null}
            </div>
            <div className='flex flex-col flex-1 mr-3'>
               <div className='flex justify-between items-center text-white'>
                  <h5>
                     {username}/{age}
                  </h5>
                  <span className='text-[10px] '>{time}</span>
               </div>
               <p className='text-sm'>{message}</p>
            </div>
         </div>
      </Link>
   );
};

MessageItem.defaultProps = {
   image: urcups,
   username: 'urcups',
   age: 39,
   time: '1m ago',
   message: 'Hello there how are you',
   isOnline: false,
   isRead: true,
};

export default MessageItem;
