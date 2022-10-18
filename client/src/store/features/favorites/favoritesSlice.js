import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
   isFavorite: {
      favorite: {},
      favIsLoading: false,
      favIsSuccess: false,
      favIsError: false,
      favIsMessage: '',
   },
   favorites: {
      favorites: [],
      favsIsLoading: false,
      favsIsSuccess: false,
      favsIsError: false,
      favsIsMessage: '',
      favsOffset: 0,
      favsLimit: 25,
   },
}

export const addRemoveFavorites = createAsyncThunk(
   'user/addRemoveFavorites',
   async (data, thunkApi) => {
      try {
         const id = thunkApi.getState().messages.userProfile.userProfile.id
         if (id !== data.user_id) return
         return await serviceReadRoomMessages(data)
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
   extraReducers: (builder) => {},
})

export const { favoriteClear } = favoriteSlice.actions
export default favoriteSlice.reducer

// SELECTOR
export const selectFavorite = (state) => state.favorites.isFavorite
export const selectFavorites = (state) => state.favorites.favorites
