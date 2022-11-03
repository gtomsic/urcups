import React from 'react'

const MainContainer = ({ children }) => {
   return (
      <>
         <main className='grid grid-cols-1 lg:grid-cols-12  gap-10 mx-auto w-full md:max-w-[98%] lg:max-w-[95%] xl:max-w-[80%]'>
            {children}
         </main>
      </>
   )
}

export default MainContainer
