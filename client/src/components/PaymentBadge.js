import moment from 'moment/moment';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { GiRibbonMedal } from 'react-icons/gi';

const PaymentBadge = ({ paid }) => {
   const [text, setText] = useState('');
   const [from, setFrom] = useState('');
   useEffect(() => {
      if (paid?.membership === 'a') {
         setText('You have: 3 months');
         setFrom(moment(paid?.createdAt).fromNow());
      }
      if (paid?.membership === 'b') {
         setText('You have: 6 months');
         setFrom(moment(paid?.createdAt).fromNow());
      }
      if (paid?.membership === 'c') {
         setText('You have: 1 year');
         setFrom(moment(paid?.createdAt).fromNow());
      }
   }, [paid]);
   return (
      <div className='flex flex-col gap-3'>
         <div className='p-5 flex justify-center items-center '>
            <div className='flex justify-center items-center text-[130px] text-white rounded-3xl shadow-xl shadow-secondary w-[150px] h-[150px] bg-gradient-to-br from-primary to-positive'>
               <GiRibbonMedal />
            </div>
         </div>
         <div className='flex flex-col items-center justify-center'>
            <p>{text}</p>
            <p>Supporter's Since: {from}</p>
         </div>
      </div>
   );
};

export default PaymentBadge;
