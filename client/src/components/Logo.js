import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo192.png';
import logoName from '../assets/urcups256.png';
import { IoChevronBack } from 'react-icons/io5';
import PrimaryButton from './PrimaryButton';

const Logo = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const isTrue =
      location.pathname.includes('/messages') ||
      location.pathname.includes('/profile') ||
      location.pathname.includes('/bells') ||
      location.pathname.includes('/favorites') ||
      location.pathname.includes('/stories');
   const onBackHandler = (e) => {
      e.stopPropagation();
      e.preventDefault();
      navigate(-1);
   };
   return (
      <>
         <div>
            {isTrue ? (
               <div
                  onClick={onBackHandler}
                  className='bg-gradient-to-tr from-primary to-secondary hover:to-danger p-2 rounded-full text-white'
               >
                  <IoChevronBack />
               </div>
            ) : (
               <>
                  <div
                     className='w-9 aspect-square rounded-full border-2 border-white md:block lg:hidden'
                     style={{
                        backgroundImage: `url(${logo})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                     }}
                  ></div>
                  <img
                     src={logoName}
                     alt='Urcups Logo'
                     className='max-w-[100px] hidden lg:block'
                  />
               </>
            )}
         </div>
      </>
   );
};

export default Logo;
