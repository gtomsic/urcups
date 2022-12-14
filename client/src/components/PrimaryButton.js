import React from 'react';

const PrimaryButton = ({ onClick, children, add }) => {
   return (
      <button
         onClick={onClick}
         className={`flex justify-center px-2 py-[14px] items-center gap-2 border border-white rounded-md bg-gradient-to-tr from-primary bg-secondary duration-300 hover:to-danger text-white ${add}`}
      >
         {children}
      </button>
   );
};

export default PrimaryButton;
