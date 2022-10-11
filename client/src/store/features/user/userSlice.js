import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProfile } from '../profile/profileSlice'

import {
   serviceLogin,
   serviceLogout,
   serviceRegister,
   serviceUpdateAvatar,
   serviceUpdateWallpaper,
   serviceVerifiyUser,
} from './userService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
   user: user ? user : null,
   isLoading: false,
   isSuccess: false,
   isError: false,
   loadingAvatar: false,
   loadingWallpaper: false,
   message: '',
}

export const updateWallpaper = createAsyncThunk(
   'user/update-wallpaper',
   async (formData, thunkApi) => {
      try {
         let username = thunkApi.getState().user.user.username
         await serviceUpdateWallpaper(formData)
         return await thunkApi.dispatch(getProfile(username))
      } catch (error) {
         const message =
            (error.response &&
               error.response.data &&
               error.response.data.message) ||
            error.message ||
            error.toString()
         return thunkApi.rejectWithValue(message)
      }
   }
)
export const updateAvatar = createAsyncThunk(
   'user/update-avatar',
   async (formData, thunkApi) => {
      try {
         let username = thunkApi.getState().user.user.username
         await serviceUpdateAvatar(formData)
         return await thunkApi.dispatch(getProfile(username))
      } catch (error) {
         const message =
            (error.response &&
               error.response.data &&
               error.response.data.message) ||
            error.message ||
            error.toString()
         return thunkApi.rejectWithValue(message)
      }
   }
)
export const verify = createAsyncThunk(
   'user/verify',
   async (token, thunkApi) => {
      try {
         return await serviceVerifiyUser(token)
      } catch (error) {
         const message =
            (error.response &&
               error.response.data &&
               error.response.data.message) ||
            error.message ||
            error.toString()
         return thunkApi.rejectWithValue(message)
      }
   }
)

export const logout = createAsyncThunk(
   'user/logout',
   async (user_id, thunkApi) => {
      try {
         return await serviceLogout(user_id)
      } catch (error) {
         const message =
            (error.response &&
               error.response.data &&
               error.response.data.message) ||
            error.message ||
            error.toString()
         return thunkApi.rejectWithValue(message)
      }
   }
)

export const register = createAsyncThunk(
   'user/register',
   async (user, thunkApi) => {
      try {
         return await serviceRegister(user)
      } catch (error) {
         const message =
            (error.response &&
               error.response.data &&
               error.response.data.message) ||
            error.message ||
            error.toString()
         return thunkApi.rejectWithValue(message)
      }
   }
)

export const login = createAsyncThunk('/user/login', async (user, thunkApi) => {
   try {
      return await serviceLogin(user)
   } catch (error) {
      const message =
         (error.response &&
            error.response.data &&
            error.response.data.message) ||
         error.message ||
         error.toString()
      return thunkApi.rejectWithValue(message)
   }
})

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      reset: (state) => {
         state.isLoading = false
         state.isSuccess = false
         state.isError = false
         state.message = ''
      },
      updateUserDetail: (state, action) => {
         const { sex, city, stateProvince, country } = action.payload
         state.user = { ...state.user, sex, city, stateProvince, country }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(register.pending, (state) => {
            state.isLoading = true
         })
         .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
         })
         .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.user = null
            state.message = action.payload
         })
         .addCase(login.pending, (state) => {
            state.isLoading = true
         })
         .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
         })
         .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.user = null
            state.message = action.payload
         })
         .addCase(logout.pending, (state) => {
            state.isLoading = true
         })
         .addCase(logout.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.user = null
            state.message = ''
            state.isError = false
         })
         .addCase(logout.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload
         })
         .addCase(verify.pending, (state) => {
            state.isLoading = true
         })
         .addCase(verify.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
         })
         .addCase(verify.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
         })
         .addCase(updateAvatar.pending, (state) => {
            state.loadingAvatar = true
         })
         .addCase(updateAvatar.fulfilled, (state, action) => {
            const { avatar, thumbnail } = action.payload.payload
            state.loadingAvatar = false
            state.isSuccess = true
            state.user = {
               ...state.user,
               avatar,
               thumbnail,
            }
         })
         .addCase(updateAvatar.rejected, (state, action) => {
            state.loadingAvatar = false
            state.isError = true
            state.message = action.payload
         })
         .addCase(updateWallpaper.pending, (state) => {
            state.loadingWallpaper = true
         })
         .addCase(updateWallpaper.fulfilled, (state, action) => {
            const { wallpaper } = action.payload.payload
            state.loadingWallpaper = false
            state.isSuccess = true
            state.user = { ...state.user, wallpaper }
         })
         .addCase(updateWallpaper.rejected, (state, action) => {
            state.loadingWallpaper = false
            state.isError = true
            state.message = action.payload
         })
   },
})

export const { reset, updateUserDetail } = userSlice.actions
export default userSlice.reducer

// SELECTORS
export const selectUser = (state) => state.user
