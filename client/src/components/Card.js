import React from 'react'

const Card = ({ children }) => {
   return (
      <div className='p-5 w-full flex flex-col gap-5 rounded-2xl bg-gradient-to-b from-primary text-white'>
         {children}
      </div>
   )
}

Card.defaultProps = {
   children: 'No content',
}

export default Card
