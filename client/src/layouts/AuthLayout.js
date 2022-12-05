import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/urcups256.png';
import { selectUser } from '../store/features/user/userSlice';

const AuthLayout = () => {
   const navigate = useNavigate();
   const { user } = useSelector(selectUser);
   useEffect(() => {
      if (user?.id) {
         navigate('/');
      }
   }, []);
   return (
      <div className='py-[100px] max-w-[500px] mx-auto overflow-hidden'>
         <Link to='/'>
            <div className='flex justify-center mb-5'>
               <img src={logo} alt='Urcups Logo' className='max-w-[200px]' />
            </div>
         </Link>
         <div className='mx-3 md:mx-3 bg-gradient-to-bl from-primary  p-8 rounded-3xl'>
            <Outlet />
         </div>
      </div>
   );
};

export default AuthLayout;
