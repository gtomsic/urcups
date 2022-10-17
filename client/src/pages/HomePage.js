import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FilterSearch from '../components/FilterSearch'
import { BiFilterAlt } from 'react-icons/bi'

import UserCard from '../components/UserCard'
import {
   getUsersByLimit,
   selectUsers,
   setLimit,
   setOffset,
} from '../store/features/users/usersSlice'
import Loader from '../components/loader/Loader'
import Pagination from '../components/Pagination'
import PrimaryButton from '../components/PrimaryButton'

const HomePage = () => {
   const { users, isLoading, filter, count } = useSelector(selectUsers)
   const { offset, limit } = filter
   const [isShowFilter, setIsShowFilter] = useState(false)

   const isSet = useRef(false)
   const dispatch = useDispatch()

   useEffect(() => {
      if (isSet.current === false) {
         dispatch(getUsersByLimit({ offset, limit }))
      }
      if (limit) {
         dispatch(getUsersByLimit({ offset, limit }))
      }
      return () => {
         isSet.current = true
      }
   }, [isSet, limit, offset, dispatch, count])
   return (
      <div className='relative'>
         {isShowFilter ? (
            <div className=' z-20 sticky top-[70px] rounded-2xl mb-5 px-2 py-0 m-2 bg-gradient-to-tr from-secondary bg-primary'>
               <FilterSearch
                  limit={limit}
                  onChange={(e) => dispatch(setLimit(e.target.value))}
                  onSaveFilter={() => setIsShowFilter(false)}
               />
            </div>
         ) : (
            <div className='sticky z-20 top-[70px] ml-3 inline-block mb-5'>
               <PrimaryButton onClick={() => setIsShowFilter(true)}>
                  <BiFilterAlt /> Filter
               </PrimaryButton>
            </div>
         )}
         <div className='min-h-[700px]'>
            {isLoading ? (
               <Loader>Searching...</Loader>
            ) : (
               <>
                  <div className='gap-1 md:gap-4 grid grid-cols-3  sm:grid-cols-5 md:grid-cols-6'>
                     {users.map((user) => {
                        return (
                           <Link key={user.id} to={`profile/${user.username}`}>
                              <UserCard
                                 wallpaper={user.wallpaper}
                                 image={user.thumbnail}
                                 age={user.age}
                                 username={user.username}
                                 location={user.country}
                                 isOnline={user.isOnline}
                              />
                           </Link>
                        )
                     })}
                  </div>
               </>
            )}
         </div>
         <Pagination
            limit={limit}
            offset={offset}
            onClick={(item) => dispatch(setOffset(item))}
            count={count}
         />
      </div>
   )
}

export default HomePage
