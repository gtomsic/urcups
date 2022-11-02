import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serviceCreateBells, serviceGetBells } from './serviceBells'

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
   },
})

export const { resetBell, resetBells } = bellsSlice.actions
export default bellsSlice.reducer

// SELECTOR
export const selectBells = (state) => state.bells
