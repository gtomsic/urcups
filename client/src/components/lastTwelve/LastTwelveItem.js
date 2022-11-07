import React from 'react';
import { useSelector } from 'react-redux';

const LastTwelveItem = ({ user }) => {
   const url = useSelector((state) => state.url);
   return (
      <div className='flex justify-center items-center'>
         <div
            className='relative w-[70px] h-[70px] rounded-full border-4 border-white mr-1'
            style={{
               backgroundImage: `url(${url + user?.avatar})`,
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
            }}
         >
            {user?.isOnline ? (
               <>
                  <span className='z-10 absolute bottom-[7px] right-[-4px] w-4 h-4 border-4 border-white rounded-full bg-secondary'></span>
                  <span className='animate-ping z-0 absolute bottom-[7px] right-[-4px] w-4 h-4  inline-flex rounded-full bg-white opacity-75'></span>
               </>
            ) : null}
         </div>
      </div>
   );
};

export default LastTwelveItem;
