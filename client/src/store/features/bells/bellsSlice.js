import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serviceCreateBells } from './serviceBells'

const initialState = {
   bell: {},
   bellLoading: false,
   bellSuccess: false,
   bellError: false,
   bellMessage: '',
   bells: [],
   bellsLoading: false,
   bellsSuccess: false,
   bellsError: false,
   bellsMessage: '',
   bellsOffset: 0,
   bellsLimit: 30,
}

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
         state.bells = {}
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
   },
})

export const { resetBell, resetBells } = bellsSlice.actions
export default bellsSlice.reducer

// SELECTOR
export const selectBells = (state) => state.bells
