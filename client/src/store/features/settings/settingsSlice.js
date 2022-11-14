import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
   serviceAddUpdateSearchOptions,
   serviceGetSearchOptions,
} from './settingsService';

const initialState = {
   searchOptions: {},
   searchOptionsLoading: false,
   searchOptionsSuccess: false,
   searchOptionsError: false,
   searchOptionsMessage: '',
};

export const actionGetSearchOptionSettings = createAsyncThunk(
   'settings/actionGetSearchOptionSettings',
   async (data, thunkApi) => {
      try {
         return await serviceGetSearchOptions(data);
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
export const actionAddUpdateSearchOption = createAsyncThunk(
   'settings/actionAddUpdateSearchOption',
   async (data, thunkApi) => {
      try {
         return await serviceAddUpdateSearchOptions(data);
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

const settingsSlice = createSlice({
   name: 'searchOption',
   initialState,
   reducers: {
      actionResetSearchOption: (state) => {
         state.searchOptions = {};
         state.searchOptionsLoading = false;
         state.searchOptionsSuccess = false;
         state.searchOptionsError = false;
         state.searchOptionsMessage = '';
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(actionAddUpdateSearchOption.pending, (state) => {
            state.searchOptionsLoading = true;
         })
         .addCase(actionAddUpdateSearchOption.fulfilled, (state, action) => {
            state.searchOptionsLoading = false;
            state.searchOptionsSuccess = true;
            state.searchOptions = action.payload;
         })
         .addCase(actionAddUpdateSearchOption.rejected, (state, action) => {
            state.searchOptionsLoading = false;
            state.searchOptionsError = true;
            state.searchOptionsMessage = action.payload;
         })
         .addCase(actionGetSearchOptionSettings.pending, (state) => {
            state.searchOptionsLoading = true;
         })
         .addCase(actionGetSearchOptionSettings.fulfilled, (state, action) => {
            state.searchOptionsLoading = false;
            state.searchOptionsSuccess = true;
            state.searchOptions = action.payload;
         })
         .addCase(actionGetSearchOptionSettings.rejected, (state, action) => {
            state.searchOptionsLoading = false;
            state.searchOptionsError = true;
            state.searchOptionsMessage = action.payload;
         });
   },
});

export const { actionResetSearchOption } = settingsSlice.actions;
export default settingsSlice.reducer;

// SELECTORS
export const selectSearchOptionSettings = (state) => state.settings;
