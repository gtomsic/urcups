import React, { useRef } from 'react';
import _ from 'lodash';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../store/features/user/userService';

const LastTwelveItem = ({ user_id }) => {
   const isFetch = useRef(false);
   const navigate = useNavigate();
   const [user, setUser] = useState({});
   const url = useSelector((state) => state.url);

   const fetchingUser = async (id) => {
      const reponse = await fetchUser(id);
      setUser(reponse);
   };

   useEffect(() => {
      if (isFetch.current === false) {
         fetchingUser(user_id);
      }
      return () => {
         isFetch.current = true;
      };
   }, [user_id]);

   return (
      <div
         onClick={() => navigate(`/messages/${user?.id}`)}
         className='flex justify-center items-center cursor-pointer'
      >
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
