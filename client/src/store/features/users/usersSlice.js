import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serviceGetUserByLimit } from './userService'

// This is users slice
const initialState = {
   users: [],
   count: 0,
   filter: { offset: 0, limit: 18, online: false, sexualOrientation: 'All' },
   isLoading: false,
   isSuccess: false,
   isError: false,
   message: '',
}

export const getUsersByLimit = createAsyncThunk(
   'user/getUsersByLimit',
   async (data, thunkApi) => {
      try {
         return await serviceGetUserByLimit(data)
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

const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      reset: (state) => {
         state.isLoading = false
         state.isSuccess = false
         state.isError = false
         state.message = ''
      },
      setLimit: (state, action) => {
         state.filter.limit = action.payload
      },
      setOffset: (state, action) => {
         state.filter.offset = action.payload
      },
      setOnline: (state, action) => {
         state.filter.online = action.payload
      },
      setSexualOrientation: (state, action) => {
         state.filter.sexualOrientation = action.payload
      },
      socketUpdateUser: (state, action) => {
         const filterUsers = state.users.filter(
            (item) => item.id !== action.payload.id
         )
         state.users = [action.payload, ...filterUsers]
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getUsersByLimit.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getUsersByLimit.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.users = action.payload.rows
            state.count = action.payload.count
         })
         .addCase(getUsersByLimit.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
         })
   },
})

export const {
   reset,
   setOffset,
   setLimit,
   setOnline,
   setSexualOrientation,
   socketUpdateUser,
} = usersSlice.actions
export default usersSlice.reducer

// SELECTORS
export const selectUsers = (state) => state.users
