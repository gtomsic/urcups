import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
   serviceBellAction,
   serviceCreateBells,
   serviceDeleteBell,
   serviceGetBells,
   serviceReadBell,
} from './serviceBells'

const initialState = {
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
}

export const actionBells = createAsyncThunk(
   'actionBells',
   async (data, thunkApi) => {
      try {
         return await serviceBellAction(data)
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

export const readBell = createAsyncThunk('readBell', async (data, thunkApi) => {
   try {
      return await serviceReadBell(data)
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

export const deleteBell = createAsyncThunk(
   'deleteBell',
   async (data, thunkApi) => {
      try {
         return await serviceDeleteBell(data)
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

export const getMoreBells = createAsyncThunk(
   'getMoreBells',
   async (data, thunkApi) => {
      try {
         return await serviceGetBells(data)
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
export const getBells = createAsyncThunk('getBells', async (data, thunkApi) => {
   try {
      return await serviceGetBells(data)
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

export const createBells = createAsyncThunk(
   'createBells',
   async (data, thunkApi) => {
      try {
         return await serviceCreateBells(data)
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

const bellsSlice = createSlice({
   name: 'bells',
   initialState,
   reducers: {
      resetBell: (state) => {
         state.bell = {}
         state.bellLoading = false
         state.bellSuccess = false
         state.bellError = false
         state.bellMessage = ''
      },
      resetBells: (state) => {
         state.bells = { rows: [], count: 0 }
         state.bellsLoading = false
         state.bellsSuccess = false
         state.bellsError = false
         state.bellsMessage = ''
      },
      setBellsOffset: (state, action) => {
         state.bellsOffset = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createBells.pending, (state) => {
            state.bellLoading = true
         })
         .addCase(createBells.fulfilled, (state, action) => {
            state.bellLoading = false
            state.bellSuccess = true
            state.bell = action.payload
         })
         .addCase(createBells.rejected, (state, action) => {
            state.bellLoading = false
            state.bellSuccess = false
            state.bellError = true
            state.bellMessage = action.payload
         })
         .addCase(actionBells.pending, (state) => {
            state.bellLoading = true
         })
         .addCase(actionBells.fulfilled, (state, action) => {
            state.bellLoading = false
            state.bellSuccess = true
            state.bell = action.payload
         })
         .addCase(actionBells.rejected, (state, action) => {
            state.bellLoading = false
            state.bellSuccess = false
            state.bellError = true
            state.bellMessage = action.payload
         })
         .addCase(getBells.pending, (state) => {
            state.bellsLoading = true
         })
         .addCase(getBells.fulfilled, (state, action) => {
            state.bellsLoading = false
            state.bellsSuccess = true
            state.bells = action.payload
            state.bells = action.payload
         })
         .addCase(getBells.rejected, (state, action) => {
            state.bellsLoading = false
            state.bellsSuccess = false
            state.bellsError = true
            state.bellsMessage = action.payload
         })
         .addCase(getMoreBells.pending, (state) => {
            state.bellsLoading = true
         })
         .addCase(getMoreBells.fulfilled, (state, action) => {
            state.bellsLoading = false
            state.bellsSuccess = true
            state.bells.rows = [...state.bells.rows, ...action.payload.rows]
            state.bells.count = action.payload.count
         })
         .addCase(getMoreBells.rejected, (state, action) => {
            state.bellsLoading = false
            state.bellsSuccess = false
            state.bellsError = true
            state.bellsMessage = action.payload
         })
         .addCase(deleteBell.pending, (state) => {
            state.bellsLoading = true
         })
         .addCase(deleteBell.fulfilled, (state, action) => {
            state.bellsLoading = false
            state.bellsSuccess = true
            state.bells = action.payload
            state.bells = action.payload
         })
         .addCase(deleteBell.rejected, (state, action) => {
            state.bellsLoading = false
            state.bellsSuccess = false
            state.bellsError = true
            state.bellsMessage = action.payload
         })
         .addCase(readBell.pending, (state) => {
            state.bellsLoading = true
         })
         .addCase(readBell.fulfilled, (state, action) => {
            state.bellsLoading = false
            state.bellsSuccess = true
            state.bells = action.payload
            state.bells = action.payload
         })
         .addCase(readBell.rejected, (state, action) => {
            state.bellsLoading = false
            state.bellsSuccess = false
            state.bellsError = true
            state.bellsMessage = action.payload
         })
   },
})

export const { resetBell, resetBells, setBellsOffset } = bellsSlice.actions
export default bellsSlice.reducer

// SELECTOR
export const selectBells = (state) => state.bells
