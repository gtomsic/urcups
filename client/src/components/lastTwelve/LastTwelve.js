import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   actionLastTwelveBells,
   selectBells,
} from '../../store/features/bells/bellsSlice';
import { selectUser } from '../../store/features/user/userSlice';
import BorderedCard from '../BorderedCard';
import LastTwelveItem from './LastTwelveItem';

const LastTwelve = () => {
   const isFetch = useRef(false);
   const dispatch = useDispatch();
   const { user } = useSelector(selectUser);
   const { lastTwelve } = useSelector(selectBells);
   useEffect(() => {
      if (isFetch.current === false) {
         dispatch(actionLastTwelveBells({ token: user?.token }));
      }
      return () => {
         isFetch.current = true;
      };
   }, []);
   return (
      <BorderedCard>
         <div className='p-3'>
            <h4>Last Connection</h4>
         </div>
         <div className='grid grid-cols-4 px-3 md:grid-cols-6 lg:grid-cols-4 gap-2 md:gap-4'>
            {lastTwelve?.rows?.map((item) => (
               <LastTwelveItem
                  key={item.id}
                  user={user}
                  user_id={item.user_id}
               />
            ))}
         </div>
      </BorderedCard>
   );
};

export default LastTwelve;
