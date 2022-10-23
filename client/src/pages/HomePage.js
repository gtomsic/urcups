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
   setOnline,
   setSexualOrientation,
} from '../store/features/users/usersSlice'
import Loader from '../components/loader/Loader'
import Pagination from '../components/Pagination'
import PrimaryButton from '../components/PrimaryButton'

const HomePage = () => {
   const isFetch = useRef(false)
   const dispatch = useDispatch()
   const [isShowFilter, setIsShowFilter] = useState(false)
   const { users, isLoading, filter, count } = useSelector(selectUsers)
   const { offset, limit, online, sexualOrientation } = filter

   useEffect(() => {
      if (limit)
         dispatch(getUsersByLimit({ offset, limit, online, sexualOrientation }))
      if (isFetch.current === false) {
         dispatch(getUsersByLimit({ offset, limit, online, sexualOrientation }))
      }
      return () => {
         isFetch.current = true
      }
   }, [isFetch, limit, offset, dispatch, count, online, sexualOrientation])
   return (
      <div className='relative'>
         {isShowFilter ? (
            <div className=' z-20 sticky top-[70px] rounded-2xl mb-5 px-2 py-0 m-2 bg-gradient-to-tr from-secondary bg-primary'>
               <FilterSearch
                  limit={limit}
                  online={online}
                  sexualOrientation={sexualOrientation}
                  setOnline={(value) => dispatch(setOnline(value))}
                  setSexualOrientation={(value) =>
                     dispatch(setSexualOrientation(value))
                  }
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
                  <div className='gap-1 md:gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                     {users.map((user) => {
                        return (
                           <Link key={user.id} to={`profile/${user.username}`}>
                              <UserCard user={user} />
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
