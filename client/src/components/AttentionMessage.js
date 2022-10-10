import React from 'react'

const AttentionMessage = ({ title, children }) => {
   return (
      <div className='rounded-3xl overflow-hidden'>
         <div className='bg-gradient-to-tr from-primary bg-danger p-5'>
            <h3>{title}</h3>
         </div>
         <div className='p-5'>{children}</div>
      </div>
   )
}

export default AttentionMessage
