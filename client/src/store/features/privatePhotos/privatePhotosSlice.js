import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
   serviceAddPrivatePhotos,
   serviceDeletePrivatePhotos,
   serviceGetPrivatePhotos,
} from './servicePrivatePhotos'

const initialState = {
   privatePhotos: [],
   privatePhotosLoading: false,
   privatePhotosSuccess: false,
   privatePhotosError: false,
   privatePhotosMessage: '',
   privatePhotosLimit: 30,
   privatePhotosOffset: 0,
}

export const addPrivatePhotos = createAsyncThunk(
   'user/add-private-photos',
   async (data, thunkApi) => {
      try {
         const { privatePhotosLimit } = thunkApi.getState().privatePhotos
         const { user } = thunkApi.getState().user
         await serviceAddPrivatePhotos(data)
         return await thunkApi.dispatch(
            getPrivatePhotos({
               user_id: user.id,
               limit: privatePhotosLimit,
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

export const deletePrivatePhotos = createAsyncThunk(
   'user/delete-private-photos',
   async (data, thunkApi) => {
      try {
         const { privatePhotosLimit } = thunkApi.getState().privatePhotos
         const { user } = thunkApi.getState().user
         await serviceDeletePrivatePhotos(data)
         return await thunkApi.dispatch(
            getPrivatePhotos({
               user_id: user.id,
               limit: privatePhotosLimit,
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

export const getPrivatePhotos = createAsyncThunk(
   'user/get-private-photos',
   async (data, thunkApi) => {
      try {
         return await serviceGetPrivatePhotos(data)
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

const privatePhotosSlice = createSlice({
   name: 'privatePhotos',
   initialState,
   reducers: {
      resetPrivatePhotos: (state) => {
         state.privatePhotos = []
         state.privatePhotosLoading = false
         state.privatePhotosSuccess = false
         state.privatePhotosError = false
         state.privatePhotosMessage = ''
         state.privatePhotosLimit = 30
         state.privatePhotosOffset = 0
      },
      setPrivatePhotosOffset: (state, action) => {
         state.privatePhotosOffset = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getPrivatePhotos.pending, (state) => {
            state.privatePhotosLoading = true
         })
         .addCase(getPrivatePhotos.fulfilled, (state, action) => {
            state.privatePhotosLoading = false
            state.privatePhotosSuccess = true
            state.privatePhotos = action.payload
         })
         .addCase(getPrivatePhotos.rejected, (state, action) => {
            state.privatePhotosLoading = false
            state.privatePhotosError = true
            state.privatePhotosMessage = action.payload
         })
         .addCase(deletePrivatePhotos.pending, (state) => {
            state.privatePhotosLoading = true
         })
         .addCase(deletePrivatePhotos.fulfilled, (state, action) => {
            state.privatePhotosLoading = false
            state.privatePhotosSuccess = true
            state.privatePhotosMessage = action.payload
         })
         .addCase(deletePrivatePhotos.rejected, (state, action) => {
            state.privatePhotosLoading = false
            state.privatePhotosError = true
            state.privatePhotosMessage = action.payload
         })
         .addCase(addPrivatePhotos.pending, (state) => {
            state.privatePhotosLoading = true
         })
         .addCase(addPrivatePhotos.fulfilled, (state) => {
            state.privatePhotosLoading = false
            state.privatePhotosSuccess = true
         })
         .addCase(addPrivatePhotos.rejected, (state, action) => {
            state.privatePhotosLoading = false
            state.privatePhotosError = true
            state.privatePhotosMessage = action.payload
         })
   },
})

export const { resetPrivatePhotos, setPrivatePhotosOffset } =
   privatePhotosSlice.actions
export default privatePhotosSlice.reducer

// SELECTORS
export const selectPrivatePhotos = (state) => state.privatePhotos
