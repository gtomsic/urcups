import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Outlet, Link } from 'react-router-dom';

import ProfileHeader from './profile/ProfileHeader';
import Loader from '../components/loader/Loader';
import {
   getProfile,
   selectProfile,
} from '../store/features/profile/profileSlice';
import Button from '../components/Button';
import { selectUser } from '../store/features/user/userSlice';
import AttentionMessage from '../components/AttentionMessage';

const ProfilePage = () => {
   const isFetch = useRef(false);
   const { profile, isLoading, isError, message } = useSelector(selectProfile);
   const { user } = useSelector(selectUser);
   const params = useParams();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getProfile(params.username));
      if (!user?.id) {
         localStorage.setItem(
            'redirect',
            JSON.stringify(`/profile/${params.username}`)
         );
      }
   }, [params, dispatch, user?.id]);

   if (isLoading) return <Loader>Loading profile...</Loader>;

   if (!profile?.id || isError)
      return (
         <AttentionMessage title='Profile not found!'>
            <p>{message}</p>
            <Link to='/'>
               <Button color='bg-primary hover:bg-secondary'>Go Home</Button>
            </Link>
         </AttentionMessage>
      );

   return (
      <div className='grid grid-cols-1 gap-11 text-white'>
         {/* Profile Header */}
         <ProfileHeader profile={profile} />
         {/* Outlet */}
         <Outlet />
      </div>
   );
};

export default ProfilePage;
