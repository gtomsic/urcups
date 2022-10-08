import React from 'react';
import logo from '../assets/logo192.png';
import logoName from '../assets/urcups256.png';

const Logo = () => {
   return (
      <>
         <div
            className='w-10 aspect-square rounded-full border-2 border-primary md:block lg:hidden'
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
            className='max-w-[120px] hidden lg:block'
         />
      </>
   );
};

export default Logo;
