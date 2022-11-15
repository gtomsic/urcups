import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
   serviceAddUpdateSearchOptions,
   serviceGetSearchOptions,
   serviceSettingsUpdatePassword,
} from './settingsService';

const initialState = {
   searchOptions: {},
   searchOptionsLoading: false,
   searchOptionsSuccess: false,
   searchOptionsError: false,
   searchOptionsMessage: '',
   password: null,
   passwordLoading: false,
   passwordSuccess: false,
   passwordError: false,
   passwordMessage: '',
};

export const actionUpdatePasswordSettings = createAsyncThunk(
   'settings/actionUpdatePasswordSettings',
   async (data, thunkApi) => {
      try {
         return await serviceSettingsUpdatePassword(data);
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
      actionResetPassowrd: (state) => {
         state.password = null;
         state.passwordLoading = false;
         state.passwordSuccess = false;
         state.passwordError = false;
         state.passwordMessage = '';
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
         })
         .addCase(actionUpdatePasswordSettings.pending, (state) => {
            state.password = null;
            state.passwordLoading = true;
            state.passwordSuccess = false;
            state.passwordError = false;
            state.passwordMessage = '';
         })
         .addCase(actionUpdatePasswordSettings.fulfilled, (state, action) => {
            state.passwordLoading = false;
            state.passwordSuccess = true;
            state.passwordError = false;
            state.password = action.payload;
         })
         .addCase(actionUpdatePasswordSettings.rejected, (state, action) => {
            state.passwordLoading = false;
            state.passwordSuccess = false;
            state.passwordError = true;
            state.passwordMessage = action.payload;
         });
   },
});

export const { actionResetSearchOption, actionResetPassowrd } =
   settingsSlice.actions;
export default settingsSlice.reducer;

// SELECTORS
export const selectSearchOptionSettings = (state) => state.settings;
export const selectSettings = (state) => state.settings;
