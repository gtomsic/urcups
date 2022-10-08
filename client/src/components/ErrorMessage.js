import React from 'react'

const ErrorMessage = ({ children }) => {
   return (
      <>
         <div className='bg-danger text-white p-[18px]'>{children}</div>
      </>
   )
}

export default ErrorMessage
