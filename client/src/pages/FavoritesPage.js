import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AttentionMessage from '../components/AttentionMessage'

import FavoritesItem from '../components/favorites/FavoritesItem'
import PrimaryButton from '../components/PrimaryButton'
import {
   getAllUserFavorites,
   selectFavorites,
} from '../store/features/favorites/favoritesSlice'
import { selectUser } from '../store/features/user/userSlice'

const FavoritesPage = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { user } = useSelector(selectUser)
   const { favorites, favsOffset, favsLimit } = useSelector(selectFavorites)
   useEffect(() => {
      if (!user?.id) return navigate('/')
      dispatch(
         getAllUserFavorites({
            token: user.token,
            offset: favsOffset,
            limit: favsLimit,
         })
      )
   }, [user])
   if (favorites?.length <= 0) {
      return (
         <AttentionMessage title={`No favorites profile`}>
            <p>Add some favorite user to start.</p>
            <p>Browse user and make them your favorites.</p>
            <br />
            <Link to='/'>
               <PrimaryButton>Browse Profiles</PrimaryButton>
            </Link>
         </AttentionMessage>
      )
   }
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
