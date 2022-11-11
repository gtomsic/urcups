import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serviceSupportPayment, seviceGetAccessStatus } from './paymentService';

const initialState = {
   paid: {},
   paidLoading: false,
   paidSuccess: false,
   paidError: false,
   paidMessage: '',
};

export const actionGetAccessStatus = createAsyncThunk(
   'actionGetAccessStatus',
   async (data, thunkApi) => {
      try {
         return await seviceGetAccessStatus(data);
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

export const actionSupportPayment = createAsyncThunk(
   'actionSupportPayment',
   async (data, thunkApi) => {
      try {
         return await serviceSupportPayment(data);
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

const paymentSlice = createSlice({
   name: 'paid',
   initialState,
   reducers: {
      actionResetPaid: (state) => {
         state.paid = {};
         state.paidLoading = false;
         state.paidSuccess = false;
         state.paidError = false;
         state.paidMessage = '';
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(actionSupportPayment.pending, (state) => {
            state.paidLoading = true;
         })
         .addCase(actionSupportPayment.fulfilled, (state, action) => {
            state.paidLoading = false;
            state.paidSuccess = true;
            state.paid = action.payload;
         })
         .addCase(actionSupportPayment.rejected, (state, action) => {
            state.paidLoading = false;
            state.paidSuccess = false;
            state.paidMessage = action.payload;
         })
         .addCase(actionGetAccessStatus.pending, (state) => {
            state.paidLoading = true;
         })
         .addCase(actionGetAccessStatus.fulfilled, (state, action) => {
            state.paidLoading = false;
            state.paidSuccess = true;
            state.paid = action.payload;
         })
         .addCase(actionGetAccessStatus.rejected, (state, action) => {
            state.paidLoading = false;
            state.paidSuccess = false;
            state.paidMessage = action.payload;
         });
   },
});

export const { actionResetPaid } = paymentSlice.actions;
export default paymentSlice.reducer;

// SELECTORS
export const selectPayment = (state) => state.paid;
