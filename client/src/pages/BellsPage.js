import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AttentionMessage from '../components/AttentionMessage'
import Loader from '../components/loader/Loader'
import {
   deleteBell,
   getBells,
   selectBells,
} from '../store/features/bells/bellsSlice'
import { selectUser } from '../store/features/user/userSlice'
import BellsItem from './bells/BellsItem'

const BellsPage = () => {
   const isFetch = useRef(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { user } = useSelector(selectUser)
   const { bellsOffset, bellsLimit, bellsLoading, bells } =
      useSelector(selectBells)
   useEffect(() => {
      if (!user?.id) return navigate('/')
      if (isFetch.current === false) {
         dispatch(
            getBells({
               limit: bellsLimit,
               offset: bellsOffset,
               token: user?.token,
            })
         )
      }
      return () => {
         isFetch.current = true
      }
   }, [user])
   const onDeleteBellHandler = (id) => {
      dispatch(
         deleteBell({
            id,
            limit: bellsLimit,
            offset: bellsOffset,
            token: user?.token,
         })
      )
   }
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
         {bellsLoading ? (
            <Loader>Loading Bells...</Loader>
         ) : (
            <div className='relative grid grid-cols-1 gap-1 lg:gap-4 xl:gap-3 md:grid-cols-2 xl:grid-cols-3'>
               {bells?.rows?.map((item) => (
                  <BellsItem
                     key={item.id}
                     bell={item}
                     onDelete={onDeleteBellHandler}
                  />
               ))}
            </div>
         )}
      </>
   )
}

export default BellsPage
