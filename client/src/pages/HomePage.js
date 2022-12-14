import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FilterSearch from '../components/FilterSearch';
import { BiFilterAlt } from 'react-icons/bi';

import UserCard from '../components/UserCard';
import {
   getUsersByLimit,
   selectUsers,
   setLimit,
   setOffset,
   setOnline,
   setSexualOrientation,
} from '../store/features/users/usersSlice';
import Loader from '../components/loader/Loader';
import Pagination from '../components/Pagination';
import PrimaryButton from '../components/PrimaryButton';
import { selectUser } from '../store/features/user/userSlice';

const HomePage = () => {
   const isFetch = useRef(false);
   const scrollView = useRef(null);
   const dispatch = useDispatch();
   const [isShowFilter, setIsShowFilter] = useState(false);
   const { users, isLoading, filter, count } = useSelector(selectUsers);
   const { offset, limit, online, sexualOrientation } = filter;
   const { user } = useSelector(selectUser);

   useEffect(() => {
      const timerId = setTimeout(() => {
         dispatch(setOffset(0));
      }, 500);
      return () => {
         clearTimeout(timerId);
      };
   }, [count]);

   useEffect(() => {
      const timerId = setTimeout(() => {
         scrollView?.current.scrollIntoView();
         dispatch(
            getUsersByLimit({
               offset,
               limit,
               online,
               sexualOrientation,
               user_id: user?.id,
            })
         );
      }, 200);

      return () => {
         clearTimeout(timerId);
      };
   }, [isFetch, limit, offset, dispatch, online, sexualOrientation]);

   return (
      <div className='relative'>
         {/* Auto scroll to view */}
         <div ref={scrollView} />
         {isShowFilter ? (
            <div className='z-20 sticky mb-3 top-[70px]  rounded-lg px-2 bg-gradient-to-tr from-danger bg-primary'>
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
            <div className='fixed z-20 top-[70px] lg:top-[100px] ml-5 mb-3 inline-block'>
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
                  <div className='relative grid grid-cols-1 gap-3 lg:gap-4 xl:gap-3 md:grid-cols-2 lg:grid-cols-3'>
                     {users.map((user) => {
                        return (
                           <Link key={user.id} to={`profile/${user.username}`}>
                              <UserCard user={user} />
                           </Link>
                        );
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
   );
};

export default HomePage;
