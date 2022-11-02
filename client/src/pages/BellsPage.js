import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AttentionMessage from '../components/AttentionMessage'
import Loader from '../components/loader/Loader'
import { getBells, selectBells } from '../store/features/bells/bellsSlice'
import { selectUser } from '../store/features/user/userSlice'
import BellsItem from './bells/BellsItem'

const BellsPage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { user } = useSelector(selectUser)
   const { bellsOffset, bellsLimit, bellsLoading, bells } =
      useSelector(selectBells)
   useEffect(() => {
      if (!user?.id) return navigate('/')
      const timerId = setTimeout(() => {
         dispatch(
            getBells({
               limit: bellsLimit,
               offset: bellsOffset,
               token: user?.token,
            })
         )
      }, 500)
      return () => {
         clearTimeout(timerId)
      }
   }, [user])
   if (!user?.id) return
   if (bells?.rows?.length < 1) {
      if (!user?.id) return
      return (
         <AttentionMessage title={`You don't have bells right now`}>
            <p>Sorry you don't have bells notification at the moment.</p>
            <p>To attract people please follow the steps.</p>
            <p>Complete your profile infomation.</p>
            <p>Change your profile avatar.</p>
            <p>Upload more photos of you at photos.</p>
            <p>Make the first move.</p>
         </AttentionMessage>
      )
   }
   return (
      <>
         {!bellsLoading ? null : <Loader>Loading Bells...</Loader>}
         {bells?.rows?.length < 1 ? null : (
            <div className='relative grid grid-cols-1 gap-1 lg:gap-4 xl:gap-3 md:grid-cols-2 lg:grid-cols-3'>
               {bells?.rows?.map((item) => (
                  <BellsItem key={item.id} bell={item} />
               ))}
            </div>
         )}
      </>
   )
}

export default BellsPage
