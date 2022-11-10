import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import PaypalPayment from './PaypalPayment';

const price = [
   { price: 20, value: 3, label: 'Months' },
   { price: 30, value: 6, label: 'Months' },
   { price: 50, value: 1, label: 'Year' },
];
const AccountStatus = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [supportValue, setSupportValue] = useState({});
   const onClickHandler = (e, value) => {
      e.preventDefault();
      e.stopPropagation();
      setSupportValue(value);
      setIsOpen(true);
      console.log(value);
   };
   return (
      <>
         <div className='flex flex-col gap-8 p-3 border border-light rounded-xl'>
            <div>
               <h3>Free account</h3>
               <ul>
                  <li>All free account can enjoy unlimited chat.</li>
                  <li>You can views unlimited user profile.</li>
                  <li>Limited to 2 private messages a day.</li>
                  <li>Not allowed to view public photos.</li>
                  <li>Not allowed to interact and view readers activity.</li>
                  <li>Not allowed to block any users.</li>
               </ul>
            </div>
            <div>
               <h3>Supporters account</h3>
               <ul>
                  <li>Besides the benefits of free account more to follows</li>
                  <li>Supported member can have unlimited private messages.</li>
                  <li>Supported member can view public photos.</li>
                  <li>Supported member can bookmark user profile.</li>
                  <li>
                     Supported member can view loves and comment to stories
                     activity.
                  </li>
               </ul>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
               {price.map((support) => (
                  <div
                     onClick={(e) => onClickHandler(e, support)}
                     key={support.price}
                     className='flex flex-col gap-1 p-5 justify-center items-center cursor-pointer rounded-lg bg-gradient-to-bl from-primary bg-secondary hover:bg-danger duration-300'
                  >
                     <div className='flex md:flex-row lg:flex-col justify-center items-center gap-2'>
                        <h3>${support.price}</h3>
                        <h3>USD</h3>
                     </div>
                     <div className='flex md:flex-row lg:flex-col justify-center items-center gap-2'>
                        <p>{support.value}</p>
                        <p>{support.label}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         {!isOpen ? null : (
            <PaypalPayment
               support={supportValue}
               onClose={() => setIsOpen(false)}
            />
         )}
      </>
   );
};

export default AccountStatus;
