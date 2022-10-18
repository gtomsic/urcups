import React from 'react'
import { Outlet } from 'react-router-dom'

import MenuItems from '../components/MenuItems'
import Header from './Header'
import LeftBar from './LeftBar'
import MainContainer from '../components/MainContainer'

const MainLayout = () => {
   return (
      <div className='flex flex-col gap-5'>
         <Header />
         <MainContainer>
            <LeftBar>
               <MenuItems />
            </LeftBar>
            <div className='px-3 lg:col-span-10 xl:col-span-9 pb-[100px]'>
               <Outlet />
            </div>
         </MainContainer>
      </div>
   )
}

export default MainLayout
