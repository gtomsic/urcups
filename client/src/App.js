import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import ProfileLayout from './layouts/ProfileLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RegisterSuccessPage from './pages/auth/RegisterSuccessPage';
import VerifyPage from './pages/auth/VerifyPage';
import HomePage from './pages/HomePage';
import MessagesPage from './pages/MessagesPage';
import BellsPage from './pages/BellsPage';
import ProfileMain from './pages/profile/ProfileMain';
import ProfilePage from './pages/ProfilePage';
import ProfilePhotos from './pages/profile/ProfilePhotos';
import ProfilePrivatePhotos from './pages/profile/ProfilePivatePhotos';
import SettingsPage from './pages/SettingsPage';
import ProfileSettings from './pages/profile/ProfileSettings';
import ProfileStories from './pages/profile/ProfileStories';
import ProfileEdit from './pages/profile/ProfileEdit';
import MessagePage from './pages/MessagePage';
import FavoritesPage from './pages/FavoritesPage';
import StoriesPage from './pages/StoriesPage';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, selectUser } from './store/features/user/userSlice';
import {
   countAllUnreadMessages,
   getAllMessages,
   insertMessage,
   insertMessages,
   readRoomMessages,
   selectAllMessages,
} from './store/features/messages/messagesSlice';
import StoryPage from './pages/StoryPage';
import { socket } from './socket';
import { socketUpdateUser } from './store/features/users/usersSlice';
import ForgotPassword from './pages/auth/ForgotPassword';
import NewPassword from './pages/auth/NewPassword';
import { actionGetAccessStatus } from './store/features/payment/paymentSlice';
import { useRef } from 'react';

const App = () => {
   const dispatch = useDispatch();
   const { user } = useSelector(selectUser);
   const { messages, messagesOffset, messagesLimit } =
      useSelector(selectAllMessages);
   useEffect(() => {
      const timerId = setTimeout(() => {
         if (user?.id) {
            dispatch(actionGetAccessStatus(user?.token));
         }
      }, 500);
      return () => {
         clearTimeout(timerId);
      };
   }, [user]);

   useEffect(() => {
      socket.on('user', async (data) => {
         if (!data?.id) return;
         await dispatch(socketUpdateUser(data));
      });
   });
   useEffect(() => {
      const timerId = setTimeout(() => {
         if (!user?.id) return;
         socket.on(`${user?.id}/message`, (msg) => {
            dispatch(insertMessage(msg));
            dispatch(insertMessages(msg));
            dispatch(
               countAllUnreadMessages({
                  token: user?.token,
                  user_id: msg.user_id,
               })
            );
            dispatch(
               readRoomMessages({
                  token: user?.token,
                  user_id: msg.user_id,
                  roomId: msg.roomId,
               })
            );
            dispatch(
               getAllMessages({
                  offset: messagesOffset,
                  limit: messagesLimit,
                  token: user.token,
                  user_id: user.id,
               })
            );
         });
      }, 500);
      return () => {
         clearTimeout(timerId);
      };
   }, []);
   useEffect(() => {
      if (!user?.id) return;
      const timerId = setTimeout(() => {
         socket.emit('user', user);
      }, 500);
      return () => {
         clearTimeout(timerId);
      };
   }, [user]);
   useEffect(() => {
      if (!user?.id) return;
      dispatch(
         countAllUnreadMessages({ token: user?.token, user_id: user?.id })
      );
   }, [user, messages, dispatch]);

   useEffect(() => {
      if (user?.id) {
         dispatch(
            countAllUnreadMessages({ token: user?.token, user_id: user.id })
         );
      }
   }, [user, dispatch]);

   return (
      <div className=' bg-dark text-gray min-h-screen w-full'>
         <Routes>
            <Route path='/' element={<MainLayout />}>
               <Route path='/' element={<HomePage />} />
               <Route path='/bells' element={<BellsPage />} />
               <Route path='/messages' element={<MessagesPage />} />
               <Route path='/messages/:id' element={<MessagePage />} />
               <Route path='/favorites' element={<FavoritesPage />} />
               <Route path='/stories' element={<StoriesPage />} />
               <Route path='/stories/:story_id' element={<StoryPage />} />
               <Route path='/settings' element={<SettingsPage />} />
            </Route>
            <Route path='/profile' element={<ProfileLayout />}>
               <Route path='/profile/:username' element={<ProfilePage />}>
                  <Route path='/profile/:username' element={<ProfileMain />} />
                  <Route
                     path='/profile/:username/photos'
                     element={<ProfilePhotos />}
                  />
                  <Route
                     path='/profile/:username/private'
                     element={<ProfilePrivatePhotos />}
                  />
                  <Route
                     path='/profile/:username/stories'
                     element={<ProfileStories />}
                  />
                  <Route
                     path='/profile/:username/settings'
                     element={<ProfileSettings />}
                  />
                  <Route
                     path='/profile/:username/edit'
                     element={<ProfileEdit />}
                  />
               </Route>
            </Route>
            <Route path='/auth' element={<AuthLayout />}>
               <Route path='/auth' element={<LoginPage />} />
               <Route path='/auth/request' element={<ForgotPassword />} />
               <Route path='/auth/register' element={<RegisterPage />} />
               <Route path='/auth/success' element={<RegisterSuccessPage />} />
               <Route
                  path='/auth/new_password/:token/:email'
                  element={<NewPassword />}
               />
               <Route path='/auth/verify/:token' element={<VerifyPage />} />
            </Route>
         </Routes>
      </div>
   );
};

export default App;
