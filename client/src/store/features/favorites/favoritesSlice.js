import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { data } from 'autoprefixer'
import {
   serviceAddRemoveFavorites,
   serviceCheckFavorites,
   serviceGetAllFavorites,
} from './serviceFavorites'

const initialState = {
   isFavorite: {
      favorite: false,
      favIsLoading: false,
      favIsSuccess: false,
      favIsError: false,
      favIsMessage: '',
   },
   favorites: {
      favsCount: 0,
      favorites: [],
      favsIsLoading: false,
      favsIsSuccess: false,
      favsIsError: false,
      favsIsMessage: '',
      favsOffset: 0,
      favsLimit: 25,
   },
}

export const getAllUserFavorites = createAsyncThunk(
   'user/getAllUserFavorites',
   async (data, thunkApi) => {
      try {
         return await serviceGetAllFavorites(data)
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

export const checkIsFavorite = createAsyncThunk(
   'user/checkIsFavorite',
   async (data, thunkApi) => {
      try {
         return await serviceCheckFavorites(data)
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

export const addRemoveFavorites = createAsyncThunk(
   'user/addRemoveFavorites',
   async (data, thunkApi) => {
      try {
         return await serviceAddRemoveFavorites(data)
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

const favoriteSlice = createSlice({
   name: 'favorites',
   initialState,
   reducers: {
      favoriteClear: (state) => {
         state.isFavorite = {
            favorite: {},
            favIsLoading: false,
            favIsSuccess: false,
            favIsError: false,
            favIsMessage: '',
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(addRemoveFavorites.pending, (state) => {
            state.isFavorite.favIsLoading = true
         })
         .addCase(addRemoveFavorites.fulfilled, (state, action) => {
            state.isFavorite.favIsLoading = false
            state.isFavorite.favIsSuccess = true
            state.isFavorite.favorite = action.payload
         })
         .addCase(addRemoveFavorites.rejected, (state, action) => {
            state.isFavorite.favIsLoading = false
            state.isFavorite.favIsSuccess = false
            state.isFavorite.favorite = false
            state.isFavorite.favIsError = true
            state.isFavorite.favIsMessage = action.payload
         })
         .addCase(checkIsFavorite.pending, (state) => {
            state.isFavorite.favIsLoading = true
         })
         .addCase(checkIsFavorite.fulfilled, (state, action) => {
            state.isFavorite.favIsLoading = false
            state.isFavorite.favIsSuccess = true
            state.isFavorite.favorite = action.payload
         })
         .addCase(checkIsFavorite.rejected, (state, action) => {
            state.isFavorite.favIsLoading = false
            state.isFavorite.favIsSuccess = false
            state.isFavorite.favorite = false
            state.isFavorite.favIsError = true
            state.isFavorite.favIsMessage = action.payload
         })
         .addCase(getAllUserFavorites.pending, (state) => {
            state.favorites.favsIsLoading = true
         })
         .addCase(getAllUserFavorites.fulfilled, (state, action) => {
            state.favorites.favsIsLoading = false
            state.favorites.favsIsSuccess = true
            state.favorites.favsCount = action.payload.count
            state.favorites.favorites = action.payload.data
         })
         .addCase(getAllUserFavorites.rejected, (state, action) => {
            state.favorites.favsIsLoading = false
            state.favorites.favsIsSuccess = false
            state.favorites.favorites = false
            state.favorites.favsIsError = true
            state.favorites.favsIsMessage = action.payload
         })
   },
})

export const { favoriteClear } = favoriteSlice.actions
export default favoriteSlice.reducer

// SELECTOR
export const selectFavorite = (state) => state.favorites.isFavorite
export const selectFavorites = (state) => state.favorites.favorites
