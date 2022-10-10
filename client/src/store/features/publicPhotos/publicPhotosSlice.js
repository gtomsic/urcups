import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serviceGetPublicPhotos } from './servicePublicPhotos'

const initialState = {
   publicPhotos: [],
   isPublicPhotosLoading: false,
   isPublicPhotosSuccess: false,
   isPublicPhotosError: false,
   isPublicPhotosMessage: '',
}

export const getPublicPhotos = createAsyncThunk(
   'user/public-photos',
   async (data, thunkApi) => {
      try {
         return await serviceGetPublicPhotos(data)
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

const publicPhotosSlice = createSlice({
   name: 'publicPhotos',
   initialState,
   reducers: {
      resetPhotos: (state) => {
         state.publicPhotos = []
         state.isPublicPhotosLoading = false
         state.isPublicPhotosSuccess = false
         state.isPublicPhotosError = false
         state.isPublicPhotosMessage = ''
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getPublicPhotos.pending, (state) => {
            state.isPublicPhotosLoading = true
         })
         .addCase(getPublicPhotos.fulfilled, (state, action) => {
            state.isPublicPhotosLoading = false
            state.isPublicPhotosSuccess = true
            state.publicPhotos = action.payload
         })
         .addCase(getPublicPhotos.rejected, (state, action) => {
            state.isPublicPhotosLoading = false
            state.isPublicPhotosError = true
            state.isPublicPhotosMessage = action.payload
         })
   },
})

export const { resetPhotos } = publicPhotosSlice.actions
export default publicPhotosSlice.reducer

// SELECTORS
export const selectPublicPhotos = (state) => state.publicPhotos
