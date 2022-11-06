import React from 'react'

const AttentionMessage = ({ title, children, profile }) => {
   return (
      <div className='rounded-3xl overflow-hidden max-w-[100%] w-full'>
         <div className='bg-gradient-to-tr from-primary to-secondary p-5'>
            <h3 className='text-white'>{title}</h3>
         </div>
         <div className='p-5 text-white bg-dark'>
            {children}
            <br />
            <br />
            <img src='/urcups256.png' alt='Urcups Logo' className='w-[130px]' />
            <p>Gabriel Tomsic</p>
            <p>Urcups Administrator</p>
         </div>
      </div>
   )
}

export default AttentionMessage
