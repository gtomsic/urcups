import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/features/user/userSlice'
import BellsItem from './bells/BellsItem'

const BellsPage = () => {
   const { user } = useSelector(selectUser)
   return (
      <div className='grid grid-cols-1 gap-5 lg:gap-4 xl:gap-4 lg:grid-cols-3 xl:grid-cols-3'>
         <BellsItem user={user} />
         <BellsItem user={user} />
         <BellsItem user={user} />
         <BellsItem user={user} />
      </div>
   )
}

export default BellsPage
