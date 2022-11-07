import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/user/userSlice';
import BorderedCard from '../BorderedCard';
import LastTwelveItem from './LastTwelveItem';

const LastTwelve = () => {
   const { user } = useSelector(selectUser);
   return (
      <BorderedCard>
         <div className='p-3'>
            <h4>Last Connection</h4>
         </div>
         <div className='grid grid-cols-4 px-3 md:grid-cols-6 lg:grid-cols-4 gap-2 md:gap-4'>
            <LastTwelveItem user={user} />
            <LastTwelveItem user={user} />
            <LastTwelveItem user={user} />
            <LastTwelveItem user={user} />
            <LastTwelveItem user={user} />
            <LastTwelveItem user={user} />
            <LastTwelveItem user={user} />
            <LastTwelveItem user={user} />
            <LastTwelveItem user={user} />
            <LastTwelveItem user={user} />
            <LastTwelveItem user={user} />
            <LastTwelveItem user={user} />
         </div>
      </BorderedCard>
   );
};

export default LastTwelve;
