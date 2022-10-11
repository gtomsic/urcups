import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { updateUserDetail } from '../user/userSlice'
import { serviceGetUser, serviceUpdateProfileInfo } from './profileService'

const initialState = {
   profile: null,
   isLoading: false,

   isSuccess: false,
   isError: false,
   message: '',
}

export const updateProfileInfo = createAsyncThunk(
   'user/update-profile-info',
   async (data, thunkApi) => {
      try {
         await thunkApi.dispatch(updateUserDetail(data))
         return await serviceUpdateProfileInfo(data)
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

export const getProfile = createAsyncThunk(
   'user/profile',
   async (username, thunkApi) => {
      try {
         return await serviceGetUser(username)
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

const profileSlice = createSlice({
   name: 'profile',
   initialState,
   reducers: {
      reset: (state) => {
         state.profile = null
         state.isLoading = false
         state.isSuccess = false
         state.isError = false
         state.message = ''
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getProfile.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getProfile.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.profile = action.payload
            state.isError = false
         })
         .addCase(getProfile.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.profile = null
            state.message = action.payload
         })
         .addCase(updateProfileInfo.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateProfileInfo.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.profile = action.payload
            state.isError = false
         })
         .addCase(updateProfileInfo.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.profile = null
            state.message = action.payload
         })
   },
})

export default profileSlice.reducer
export const { reset } = profileSlice.actions

// SELECTORS
export const selectProfile = (state) => state.profile
