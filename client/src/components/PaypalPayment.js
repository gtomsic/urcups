import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import Modal from './Modal';
import { useState } from 'react';
import { useEffect } from 'react';
import { serviceGetPaypalId } from '../store/features/payment/paymentService';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/features/user/userSlice';
import AttentionMessage from './AttentionMessage';
import { AiOutlineClose } from 'react-icons/ai';

const PaypalPayment = ({ support, onClose }) => {
   const [clientId, setClientId] = useState(null);
   const { user } = useSelector(selectUser);
   useEffect(() => {
      const fetPaypalId = async () => {
         const response = await serviceGetPaypalId(user?.token);
         setClientId(response);
      };
      fetPaypalId();
   }, [support]);
   const onOrderHandler = (data, actions) => {
      return actions.order.create({
         purchase_units: [
            {
               amount: {
                  value: support.price,
               },
            },
         ],
      });
   };
   const onApproveHandler = async (data, actions) => {
      return actions.order.capture().then((details) => {
         const data = {
            name: details.payer.name.given_name,
            surname: details.payer.name.surname,
            email: details.payer.email_address,
            amount: details.purchase_units[0].amount.value,
            payerOrderId: details.id,
         };
         console.log(details);
         console.log(data);
      });
   };
   if (!clientId) return;
   return (
      <Modal>
         <div className='relative md:max-w-[60%] w-full flex flex-col lg:flex-row h-screen lg:h-[70vh] overflow-y-scroll  text-white p-5 gap-5'>
            <div className='lg:flex-1'>
               <div className='lg:sticky lg:top-0'>
                  <AttentionMessage title={`Mode of payment`}>
                     <p>Please chose your mode of payment.</p>
                     <p>For {`${support.value} ${support.label}`} supports.</p>
                     <br />
                     <div className='flex flex-col gap-1 p-5 justify-center items-center cursor-pointer rounded-lg bg-gradient-to-bl from-primary bg-danger'>
                        <h3>Price: ${support.price}</h3>
                     </div>
                  </AttentionMessage>
               </div>
            </div>
            <div className='flex-1'>
               <div className='rounded-md p-3 bg-white'>
                  <PayPalScriptProvider options={{ 'client-id': clientId }}>
                     <PayPalButtons
                        createOrder={onOrderHandler}
                        onApprove={onApproveHandler}
                     />
                  </PayPalScriptProvider>
               </div>
            </div>
         </div>
         <div
            onClick={onClose}
            className='absolute z-30 top-0 right-0 p-3 rounded-bl-3xl text-white text-2xl lg:text-5xl bg-gradient-to-tr from-primary bg-secondary hover:from-danger hover:to-primary cursor-pointer'
         >
            <AiOutlineClose />
         </div>
      </Modal>
   );
};

export default PaypalPayment;
