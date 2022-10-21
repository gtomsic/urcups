import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import FavoritesItem from '../components/favorites/FavoritesItem'
import {
   getAllUserFavorites,
   selectFavorites,
} from '../store/features/favorites/favoritesSlice'
import { selectUser } from '../store/features/user/userSlice'

const FavoritesPage = () => {
   const dispatch = useDispatch()
   const { user } = useSelector(selectUser)
   const { favorites, favsOffset, favsLimit } = useSelector(selectFavorites)
   useEffect(() => {
      if (!user?.id) return
      dispatch(
         getAllUserFavorites({
            token: user.token,
            offset: favsOffset,
            limit: favsLimit,
         })
      )
   }, [])
   if (favorites?.length <= 0) return
   return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8'>
         {favorites?.map((item) => (
            <Link key={item.id} to={`/profile/${item.username}`}>
               <FavoritesItem user={item} />
            </Link>
         ))}
      </div>
   )
}

export default FavoritesPage
