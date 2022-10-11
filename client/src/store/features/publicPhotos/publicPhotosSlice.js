import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
   serviceAddPublicPhotos,
   serviceDeletePublicPhotos,
   serviceGetPublicPhotos,
} from './servicePublicPhotos'

const initialState = {
   publicPhotos: [],
   isPublicPhotosLoading: false,
   isPublicPhotosSuccess: false,
   isPublicPhotosError: false,
   isPublicPhotosMessage: '',
   publicPhotosLimit: 20,
   publicPhotosOffset: 0,
}

export const addPublicPhotos = createAsyncThunk(
   'user/add-public-photos',
   async (data, thunkApi) => {
      try {
         const { publicPhotosLimit } = thunkApi.getState().publicPhotos
         const { user } = thunkApi.getState().user
         await serviceAddPublicPhotos(data)
         return await thunkApi.dispatch(
            getPublicPhotos({
               user_id: user.id,
               limit: publicPhotosLimit,
               offset: 0,
               token: user.token,
            })
         )
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

export const deletePublicPhotos = createAsyncThunk(
   'user/delete-public-photos',
   async (data, thunkApi) => {
      try {
         const { publicPhotosLimit } = thunkApi.getState().publicPhotos
         const { user } = thunkApi.getState().user
         await serviceDeletePublicPhotos(data)
         return await thunkApi.dispatch(
            getPublicPhotos({
               user_id: user.id,
               limit: publicPhotosLimit,
               offset: 0,
               token: user.token,
            })
         )
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
      setPublicPhotosOffset: (state, action) => {
         state.publicPhotosOffset = action.payload
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
         .addCase(deletePublicPhotos.pending, (state) => {
            state.isPublicPhotosLoading = true
         })
         .addCase(deletePublicPhotos.fulfilled, (state, action) => {
            state.isPublicPhotosLoading = false
            state.isPublicPhotosSuccess = true
            state.isPublicPhotosMessage = action.payload
         })
         .addCase(deletePublicPhotos.rejected, (state, action) => {
            state.isPublicPhotosLoading = false
            state.isPublicPhotosError = true
            state.isPublicPhotosMessage = action.payload
         })
         .addCase(addPublicPhotos.pending, (state) => {
            state.isPublicPhotosLoading = true
         })
         .addCase(addPublicPhotos.fulfilled, (state) => {
            state.isPublicPhotosLoading = false
            state.isPublicPhotosSuccess = true
         })
         .addCase(addPublicPhotos.rejected, (state, action) => {
            state.isPublicPhotosLoading = false
            state.isPublicPhotosError = true
            state.isPublicPhotosMessage = action.payload
         })
   },
})

export const { resetPhotos, setPublicPhotosOffset } = publicPhotosSlice.actions
export default publicPhotosSlice.reducer

// SELECTORS
export const selectPublicPhotos = (state) => state.publicPhotos
