import React from 'react'
import './loader.css'
const Loader = ({ children }) => {
   return (
      <div className='flex flex-col justify-center items-center text-white'>
         <span className='loader'></span>
         {children}
      </div>
   )
}

export default Loader
