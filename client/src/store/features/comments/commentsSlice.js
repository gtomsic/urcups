import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serviceCreateComment, serviceGetComments } from './serviceComments'

const initialState = {
   comments: { rows: [], count: 0 },
   commentsLoading: false,
   commentsSuccess: false,
   commentsError: false,
   commentsMessage: '',
}

export const getComments = createAsyncThunk(
   'user/getComments',
   async (data, thunkApi) => {
      try {
         return await serviceGetComments(data)
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

export const createComments = createAsyncThunk(
   'user/createComments',
   async (data, thunkApi) => {
      try {
         return await serviceCreateComment(data)
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

const commentsSlice = createSlice({
   name: 'comments',
   initialState,
   reducers: {
      resetComments: (state) => {
         state.comments = []
         state.commentsLoading = false
         state.commentsSuccess = false
         state.commentsError = false
         state.commentsMessage = ''
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createComments.pending, (state) => {
            state.commentsLoading = true
         })
         .addCase(createComments.fulfilled, (state, action) => {
            console.log(action.payload)
            state.commentsLoading = false
            state.commentsSuccess = true
            state.comments.rows = [action.payload, ...state.comments.rows]
         })
         .addCase(createComments.rejected, (state, action) => {
            state.commentsLoading = false
            state.commentsSuccess = false
            state.commentsMessage = action.payload
         })
         .addCase(getComments.pending, (state) => {
            state.commentsLoading = true
         })
         .addCase(getComments.fulfilled, (state, action) => {
            state.commentsLoading = false
            state.commentsSuccess = true
            state.comments.rows = [
               ...state.comments.rows,
               ...action.payload.rows,
            ]
            state.comments.count = action.payload.count
         })
         .addCase(getComments.rejected, (state, action) => {
            state.commentsLoading = false
            state.commentsSuccess = false
            state.commentsMessage = action.payload
         })
   },
})

export const { resetComments } = commentsSlice.actions
export default commentsSlice.reducer

// SELECTORS
export const selectComments = (state) => state.comments
