import React from 'react'

const PrimaryButton = ({ onClick, children, add }) => {
   return (
      <button
         onClick={onClick}
         className={`flex justify-center z-30 p-2 md:p-3 items-center gap-2 border border-white rounded-md bg-gradient-to-tr from-primary bg-secondary duration-300 hover:from-danger text-white ${add}`}
      >
         {children}
      </button>
   )
}

export default PrimaryButton
