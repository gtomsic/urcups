import _ from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
   serviceBellAction,
   serviceCountBells,
   serviceCreateBells,
   serviceDeleteBell,
   serviceGetBells,
   serviceLastTwelveBells,
   serviceReadBell,
} from './serviceBells';

const initialState = {
   count: 0,
   bell: {},
   bellLoading: false,
   bellSuccess: false,
   bellError: false,
   bellMessage: '',
   bells: { rows: [], count: 0 },
   bellsLoading: false,
   bellsSuccess: false,
   bellsError: false,
   bellsMessage: '',
   bellsOffset: 0,
   bellsLimit: 30,
   lastTwelve: { rows: [], count: 0 },
   lastTwelveLoadding: false,
   lastTwelveSuccess: false,
   lastTwelveError: false,
   lastTwelveMessage: '',
};

export const actionLastTwelveBells = createAsyncThunk(
   'actionLastTwelveBells',
   async (data, thunkApi) => {
      try {
         return await serviceLastTwelveBells(data);
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
export const actionBells = createAsyncThunk(
   'actionBells',
   async (data, thunkApi) => {
      try {
         return await serviceBellAction(data);
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

export const countBells = createAsyncThunk(
   'countBells',
   async (data, thunkApi) => {
      try {
         return await serviceCountBells(data);
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

export const readBell = createAsyncThunk('readBell', async (data, thunkApi) => {
   try {
      return await serviceReadBell(data);
   } catch (error) {
      const message =
         (error.response &&
            error.response.data &&
            error.response.data.message) ||
         error.message ||
         error.toString();
      return thunkApi.rejectWithValue(message);
   }
});

export const deleteBell = createAsyncThunk(
   'deleteBell',
   async (data, thunkApi) => {
      try {
         return await serviceDeleteBell(data);
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

export const getMoreBells = createAsyncThunk(
   'getMoreBells',
   async (data, thunkApi) => {
      try {
         return await serviceGetBells(data);
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
export const getBells = createAsyncThunk('getBells', async (data, thunkApi) => {
   try {
      return await serviceGetBells(data);
   } catch (error) {
      const message =
         (error.response &&
            error.response.data &&
            error.response.data.message) ||
         error.message ||
         error.toString();
      return thunkApi.rejectWithValue(message);
   }
});

export const createBells = createAsyncThunk(
   'createBells',
   async (data, thunkApi) => {
      try {
         return await serviceCreateBells(data);
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

const bellsSlice = createSlice({
   name: 'bells',
   initialState,
   reducers: {
      resetBell: (state) => {
         state.bell = {};
         state.bellLoading = false;
         state.bellSuccess = false;
         state.bellError = false;
         state.bellMessage = '';
      },
      resetBells: (state) => {
         state.bells = { rows: [], count: 0 };
         state.bellsLoading = false;
         state.bellsSuccess = false;
         state.bellsError = false;
         state.bellsMessage = '';
      },
      setBellsOffset: (state, action) => {
         state.bellsOffset = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createBells.pending, (state) => {
            state.bellLoading = true;
         })
         .addCase(createBells.fulfilled, (state, action) => {
            state.bellLoading = false;
            state.bellSuccess = true;
            state.bell = action.payload;
         })
         .addCase(createBells.rejected, (state, action) => {
            state.bellLoading = false;
            state.bellSuccess = false;
            state.bellError = true;
            state.bellMessage = action.payload;
         })
         .addCase(countBells.pending, (state) => {
            state.bellLoading = true;
         })
         .addCase(countBells.fulfilled, (state, action) => {
            state.bellLoading = false;
            state.bellSuccess = true;
            state.count = action.payload;
         })
         .addCase(countBells.rejected, (state, action) => {
            state.bellLoading = false;
            state.bellSuccess = false;
            state.bellError = true;
            state.bellMessage = action.payload;
         })
         .addCase(actionBells.pending, (state) => {
            state.bellLoading = true;
         })
         .addCase(actionBells.fulfilled, (state, action) => {
            state.bellLoading = false;
            state.bellSuccess = true;
            state.bell = action.payload;
         })
         .addCase(actionBells.rejected, (state, action) => {
            state.bellLoading = false;
            state.bellSuccess = false;
            state.bellError = true;
            state.bellMessage = action.payload;
         })
         .addCase(getBells.pending, (state) => {
            state.bellsLoading = true;
         })
         .addCase(getBells.fulfilled, (state, action) => {
            state.bellsLoading = false;
            state.bellsSuccess = true;
            const sortedBells = _.orderBy(
               action.payload.rows,
               'createdAt',
               'desc'
            );
            state.bells.rows = sortedBells;
            state.bells.count = action.payload.count;
         })
         .addCase(getBells.rejected, (state, action) => {
            state.bellsLoading = false;
            state.bellsSuccess = false;
            state.bellsError = true;
            state.bellsMessage = action.payload;
         })
         .addCase(getMoreBells.pending, (state) => {
            state.bellsLoading = true;
         })
         .addCase(getMoreBells.fulfilled, (state, action) => {
            state.bellsLoading = false;
            state.bellsSuccess = true;
            const sortedBells = _.orderBy(
               action.payload.rows,
               'createdAt',
               'asc'
            );
            state.bells.rows = [...state.bells.rows, ...sortedBells];
            state.bells.count = action.payload.count;
         })
         .addCase(getMoreBells.rejected, (state, action) => {
            state.bellsLoading = false;
            state.bellsSuccess = false;
            state.bellsError = true;
            state.bellsMessage = action.payload;
         })
         .addCase(deleteBell.pending, (state) => {
            state.bellsLoading = true;
         })
         .addCase(deleteBell.fulfilled, (state, action) => {
            state.bellsLoading = false;
            state.bellsSuccess = true;
            state.bells = action.payload;
            state.bells = action.payload;
         })
         .addCase(deleteBell.rejected, (state, action) => {
            state.bellsLoading = false;
            state.bellsSuccess = false;
            state.bellsError = true;
            state.bellsMessage = action.payload;
         })
         .addCase(readBell.pending, (state) => {
            state.bellsLoading = true;
         })
         .addCase(readBell.fulfilled, (state, action) => {
            state.bellsLoading = false;
            state.bellsSuccess = true;
            state.bells = action.payload;
         })
         .addCase(readBell.rejected, (state, action) => {
            state.bellsLoading = false;
            state.bellsSuccess = false;
            state.bellsError = true;
            state.bellsMessage = action.payload;
         })
         .addCase(actionLastTwelveBells.pending, (state) => {
            state.lastTwelveLoadding = true;
         })
         .addCase(actionLastTwelveBells.fulfilled, (state, action) => {
            state.lastTwelveLoadding = false;
            state.lastTwelveSuccess = true;
            state.lastTwelve = action.payload;
         })
         .addCase(actionLastTwelveBells.rejected, (state, action) => {
            state.lastTwelveLoadding = false;
            state.lastTwelveSuccess = false;
            state.lastTwelveError = true;
            state.lastTwelveMessage = action.payload;
         });
   },
});

export const { resetBell, resetBells, setBellsOffset } = bellsSlice.actions;
export default bellsSlice.reducer;

// SELECTOR
export const selectBells = (state) => state.bells;
