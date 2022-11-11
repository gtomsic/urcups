import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import usersReducers from '../features/users/usersSlice';
import profileReducer from '../features/profile/profileSlice';
import publicPhotosReducer from '../features/publicPhotos/publicPhotosSlice';
import privatePhotosReducer from '../features/privatePhotos/privatePhotosSlice';
import messagesReducer from '../features/messages/messagesSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import storySlice from '../features/stories/storySlice';
import commentsSlice from '../features/comments/commentsSlice';
import bellsSlice from '../features/bells/bellsSlice';
import authSlice from '../features/auth/authSlice';
import paymentSlice from '../features/payment/paymentSlice';

import { serverUrl } from '../../url';

export const store = configureStore({
   reducer: {
      url: () => serverUrl,
      user: userReducer,
      users: usersReducers,
      profile: profileReducer,
      publicPhotos: publicPhotosReducer,
      privatePhotos: privatePhotosReducer,
      messages: messagesReducer,
      favorites: favoritesReducer,
      story: storySlice,
      comments: commentsSlice,
      bells: bellsSlice,
      auth: authSlice,
      paid: paymentSlice,
   },
});
