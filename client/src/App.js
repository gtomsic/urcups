import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import ProfileLayout from './layouts/ProfileLayout'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import RegisterSuccessPage from './pages/auth/RegisterSuccessPage'
import VerifyPage from './pages/auth/VerifyPage'
import ChatsPage from './pages/ChatsPage'
import HomePage from './pages/HomePage'
import MessagesPage from './pages/MessagesPage'
import NotificationsPage from './pages/NotificationsPage'
import ProfileMain from './pages/profile/ProfileMain'
import ProfilePage from './pages/ProfilePage'
import ProfilePhotos from './pages/profile/ProfilePhotos'
import ProfilePrivatePhotos from './pages/profile/ProfilePivatePhotos'
import SettingsPage from './pages/SettingsPage'
import ProfileSettings from './pages/profile/ProfileSettings'
import ProfileReader from './pages/profile/ProfileReader'
import ProfileEdit from './pages/profile/ProfileEdit'
import MessagePage from './pages/MessagePage'

const App = () => {
   return (
      <div className=' bg-dark text-gray min-h-screen w-full'>
         <Routes>
            <Route path='/' element={<MainLayout />}>
               <Route path='/' element={<HomePage />} />
               <Route path='/notifications' element={<NotificationsPage />} />
               <Route path='/messages' element={<MessagesPage />} />
               <Route path='/messages/:user_id' element={<MessagePage />} />
               <Route path='/chats' element={<ChatsPage />} />
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
                     path='/profile/:username/reader'
                     element={<ProfileReader />}
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
               <Route path='/auth/register' element={<RegisterPage />} />
               <Route path='/auth/success' element={<RegisterSuccessPage />} />
               <Route path='/auth/verify/:token' element={<VerifyPage />} />
            </Route>
         </Routes>
      </div>
   )
}

export default App
