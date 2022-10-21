import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'
import usersReducers from '../features/users/usersSlice'
import profileReducer from '../features/profile/profileSlice'
import publicPhotosReducer from '../features/publicPhotos/publicPhotosSlice'
import privatePhotosReducer from '../features/privatePhotos/privatePhotosSlice'
import messagesReducer from '../features/messages/messagesSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'

export const store = configureStore({
   reducer: {
      url: () => 'http://10.0.0.50:8000',
      user: userReducer,
      users: usersReducers,
      profile: profileReducer,
      publicPhotos: publicPhotosReducer,
      privatePhotos: privatePhotosReducer,
      messages: messagesReducer,
      favorites: favoritesReducer,
   },
})
