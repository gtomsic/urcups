import React from 'react'
import { useSelector } from 'react-redux'

import FavoritesItem from '../components/favorites/FavoritesItem'
import { selectUser } from '../store/features/user/userSlice'

const FavoritesPage = () => {
   const { user } = useSelector(selectUser)
   return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8'>
         <FavoritesItem user={user} />
         <FavoritesItem user={user} />
         <FavoritesItem user={user} />
         <FavoritesItem user={user} />
         <FavoritesItem user={user} />
      </div>
   )
}

export default FavoritesPage
