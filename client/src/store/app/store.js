import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import usersReducers from "../features/users/usersSlice";
import profileReducer from "../features/profile/profileSlice";

export const store = configureStore({
   reducer: {
      url: () => "http://10.0.0.177:8000",
      user: userReducer,
      users: usersReducers,
      profile: profileReducer,
   },
});
