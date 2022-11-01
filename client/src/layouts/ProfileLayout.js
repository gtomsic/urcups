import React from 'react'
import { Outlet } from 'react-router-dom'
import MainContainer from '../components/MainContainer'

import MenuItems from '../components/MenuItems'

import Header from './Header'
import LeftBar from './LeftBar'

const ProfileLayout = () => {
   return (
      <div className='flex flex-col gap-5'>
         <Header />
         <MainContainer>
            <LeftBar>
               <MenuItems />
            </LeftBar>

            <div className='lg:col-span-10 xl:col-span-9 pb-[100px]'>
               <Outlet />
            </div>
         </MainContainer>
      </div>
   )
}

export default ProfileLayout
