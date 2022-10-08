import React from 'react'

const Container = ({ children }) => {
   return (
      <div className='mx-auto w-full md:max-w-[98%] lg:max-w-[95%] xl:max-w-[80%]'>
         {children}
      </div>
   )
}

export default Container
