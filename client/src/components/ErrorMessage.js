import React from 'react';

const ErrorMessage = ({ children }) => {
   return (
      <>
         <div className='bg-danger text-white p-3'>{children}</div>
      </>
   );
};

export default ErrorMessage;
