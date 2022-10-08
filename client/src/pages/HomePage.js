import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import FilterSearch from "../components/FilterSearch";
import { BiFilterAlt } from "react-icons/bi";

import UserCard from "../components/UserCard";
import {
   getUsersByLimit,
   selectUsers,
   setLimit,
   setOffset,
} from "../store/features/users/usersSlice";
import Loader from "../components/loader/Loader";
import Pagination from "../components/Pagination";

const HomePage = () => {
   const { users, isLoading, filter, count } = useSelector(selectUsers);
   const { offset, limit } = filter;
   const [isShowFilter, setIsShowFilter] = useState(false);

   const isSet = useRef(false);
   const dispatch = useDispatch();

   useEffect(() => {
      if (isSet.current === false) {
         dispatch(getUsersByLimit({ offset, limit }));
      }
      if (limit) {
         dispatch(getUsersByLimit({ offset, limit }));
      }
      return () => {
         isSet.current = true;
      };
   }, [isSet, limit, offset, dispatch, count]);
   return (
      <div className="relative">
         {isShowFilter ? (
            <div className=" bg-dark bg-opacity-80 rounded-2xl mb-5">
               <FilterSearch
                  limit={limit}
                  onChange={(e) => dispatch(setLimit(e.target.value))}
                  onSaveFilter={() => setIsShowFilter(false)}
               />
            </div>
         ) : (
            <div className="left-[20px] bg-dark bg-opacity-80 rounded-2xl mb-5 w-[100px]">
               <Button onClick={() => setIsShowFilter(true)}>
                  <BiFilterAlt /> Filter
               </Button>
            </div>
         )}
         <div className="min-h-[700px]">
            {isLoading ? (
               <Loader>Searching...</Loader>
            ) : (
               <>
                  <div className="gap-1 md:gap-4 grid grid-cols-3  sm:grid-cols-5 md:grid-cols-6">
                     {users.map((user) => (
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
                     ))}
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
