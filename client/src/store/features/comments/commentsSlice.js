import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
   serviceCountComments,
   serviceCreateComment,
   serviceGetComments,
   seviceDeleteComments,
} from './serviceComments'

const initialState = {
   comments: { rows: [], count: 0 },
   commentsLoading: false,
   commentsSuccess: false,
   commentsError: false,
   commentsMessage: '',
}

export const deleteComments = createAsyncThunk(
   'user/deleteComments',
   async (data, thunkApi) => {
      try {
         return await seviceDeleteComments(data)
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
export const countComments = createAsyncThunk(
   'user/countComments',
   async (story_id, thunkApi) => {
      try {
         return await serviceCountComments(story_id)
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

export const moreComments = createAsyncThunk(
   'user/moreComments',
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
            state.comments = action.payload
         })
         .addCase(getComments.rejected, (state, action) => {
            state.commentsLoading = false
            state.commentsSuccess = false
            state.commentsMessage = action.payload
         })
         .addCase(moreComments.pending, (state) => {
            state.commentsLoading = true
         })
         .addCase(moreComments.fulfilled, (state, action) => {
            state.commentsLoading = false
            state.commentsSuccess = true
            state.comments.rows = [
               ...state.comments.rows,
               ...action.payload.rows,
            ]
         })
         .addCase(moreComments.rejected, (state, action) => {
            state.commentsLoading = false
            state.commentsSuccess = false
            state.commentsMessage = action.payload
         })
         .addCase(countComments.pending, (state) => {
            state.commentsLoading = true
         })
         .addCase(countComments.fulfilled, (state, action) => {
            state.commentsLoading = false
            state.commentsSuccess = true
            state.comments.count = action.payload.count
         })
         .addCase(countComments.rejected, (state, action) => {
            state.commentsLoading = false
            state.commentsSuccess = false
            state.commentsMessage = action.payload
         })
         .addCase(deleteComments.pending, (state) => {
            state.commentsLoading = true
         })
         .addCase(deleteComments.fulfilled, (state, action) => {
            state.commentsLoading = false
            state.commentsSuccess = true
            const newRows = state.comments.rows.filter(
               (item) => item.id !== Number(action.payload.id)
            )

            state.comments.rows = newRows
            state.comments.count = state.comments.count - 1
         })
         .addCase(deleteComments.rejected, (state, action) => {
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
