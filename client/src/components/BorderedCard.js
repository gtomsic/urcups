import React from 'react';

const BorderedCard = ({ children }) => {
   return (
      <div className='border border-light rounded-xl bg-gradient-to-tr from-dark to-primary p-3'>
         {children}
      </div>
   );
};

export default BorderedCard;
