import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serviceAuthRequest, serviceAuthRequestUpdate } from './authService'

const initialState = {
   auth: {},
   authLoading: false,
   authSuccess: false,
   authError: false,
   authMessage: '',
}

export const actionAuthRequestUpdate = createAsyncThunk(
   'actionAuthRequestUpdate',
   async (data, thunkApi) => {
      try {
         return await serviceAuthRequestUpdate(data)
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
export const actionAuthRequest = createAsyncThunk(
   'actionAuthRequest',
   async (data, thunkApi) => {
      try {
         return await serviceAuthRequest(data)
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

const authSliceReducer = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      actionResetAuth: (state) => {
         state.auth = {}
         state.authLoading = false
         state.authSuccess = false
         state.authError = false
         state.authMessage = ''
      },
   },
   extraReducers: (builder) => {},
})

export const { actionResetAuth } = authSliceReducer.actions
export default authSliceReducer.reducer

// SELECTORS
export const selectAuth = (state) => state.auth
