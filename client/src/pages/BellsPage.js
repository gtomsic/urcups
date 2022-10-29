import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../store/features/user/userSlice'
import BellsItem from './bells/BellsItem'

const BellsPage = () => {
   const navigate = useNavigate()
   const { user } = useSelector(selectUser)
   useEffect(() => {
      if (!user?.id) return navigate('/')
   }, [user])
   if (!user?.id) return
   return (
      <div className='relative grid grid-cols-1 gap-5 lg:gap-4 xl:gap-3 md:grid-cols-2 lg:grid-cols-3'>
         <BellsItem user={user} />
         <BellsItem user={user} />
         <BellsItem user={user} />
         <BellsItem user={user} />
      </div>
   )
}

export default BellsPage
