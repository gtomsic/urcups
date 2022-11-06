import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { serviceAuthRequest, serviceAuthRequestUpdate } from './authService';

const initialState = {
   auth: {},
   authLoading: false,
   authSuccess: false,
   authError: false,
   authMessage: '',
};

export const actionAuthRequestUpdate = createAsyncThunk(
   'actionAuthRequestUpdate',
   async (data, thunkApi) => {
      try {
         return await serviceAuthRequestUpdate(data);
      } catch (error) {
         const message =
            (error.response &&
               error.response.data &&
               error.response.data.message) ||
            error.message ||
            error.toString();
         return thunkApi.rejectWithValue(message);
      }
   }
);
export const actionAuthRequest = createAsyncThunk(
   'actionAuthRequest',
   async (data, thunkApi) => {
      try {
         return await serviceAuthRequest(data);
      } catch (error) {
         const message =
            (error.response &&
               error.response.data &&
               error.response.data.message) ||
            error.message ||
            error.toString();
         return thunkApi.rejectWithValue(message);
      }
   }
);

const authSliceReducer = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      actionResetAuth: (state) => {
         state.auth = {};
         state.authLoading = false;
         state.authSuccess = false;
         state.authError = false;
         state.authMessage = '';
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(actionAuthRequest.pending, (state) => {
            state.authLoading = true;
         })
         .addCase(actionAuthRequest.fulfilled, (state, action) => {
            state.authLoading = false;
            state.authSuccess = true;
            state.auth = action.payload;
         })
         .addCase(actionAuthRequest.rejected, (state, action) => {
            state.authLoading = false;
            state.authError = true;
            state.authMessage = action.payload;
         })
         .addCase(actionAuthRequestUpdate.pending, (state) => {
            state.authLoading = true;
         })
         .addCase(actionAuthRequestUpdate.fulfilled, (state, action) => {
            state.authLoading = false;
            state.authSuccess = true;
            state.auth = action.payload;
         })
         .addCase(actionAuthRequestUpdate.rejected, (state, action) => {
            state.authLoading = false;
            state.authError = true;
            state.authMessage = action.payload;
         });
   },
});

export const { actionResetAuth } = authSliceReducer.actions;
export default authSliceReducer.reducer;

// SELECTORS
export const selectAuth = (state) => state.auth;
