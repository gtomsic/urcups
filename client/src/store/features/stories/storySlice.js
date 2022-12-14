import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
   serviceCreateStory,
   serviceCreateText,
   serviceDeleteStory,
   serviceGetAllPublicStories,
   serviceGetAllUserStories,
   serviceGetStoryById,
} from './serviceStory'

const initialState = {
   story: {
      story: {},
      storyIsLoading: false,
      storyIsSuccess: false,
      storyIsError: false,
      storyIsMessage: '',
   },
   stories: {
      stories: {},
      storiesIsLoading: false,
      storiesIsSuccess: false,
      storiesIsError: false,
      storiesIsMessage: '',
      storiesOffset: 0,
      storiesLimit: 30,
   },
   userStories: {
      userStories: {},
      userStoriesIsLoading: false,
      userStoriesIsSuccess: false,
      userStoriesIsError: false,
      userStoriesIsMessage: '',
      userStoriesOffset: 0,
      userStoriesLimit: 30,
   },
}

export const deleteStory = createAsyncThunk(
   'user/deleteStory',
   async (data, thunkApi) => {
      try {
         return await serviceDeleteStory(data)
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
export const getStoryById = createAsyncThunk(
   'user/getStoryById',
   async (id, thunkApi) => {
      try {
         return await serviceGetStoryById(id)
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
export const getAllUserStories = createAsyncThunk(
   'user/getAllUserStories',
   async (data, thunkApi) => {
      try {
         return await serviceGetAllUserStories(data)
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
export const getMoreUserStories = createAsyncThunk(
   'user/getMoreUserStories',
   async (data, thunkApi) => {
      try {
         return await serviceGetAllUserStories(data)
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

export const getMorePublicStories = createAsyncThunk(
   'user/getMorePublicStories',
   async (data, thunkApi) => {
      try {
         return await serviceGetAllPublicStories(data)
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

export const getAllPublicStories = createAsyncThunk(
   'user/getAllPublicStories',
   async (data, thunkApi) => {
      try {
         return await serviceGetAllPublicStories(data)
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
export const createStoryText = createAsyncThunk(
   'user/createStoryText',
   async (data, thunkApi) => {
      try {
         return await serviceCreateText(data)
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
export const createStory = createAsyncThunk(
   'user/createStory',
   async (data, thunkApi) => {
      try {
         return await serviceCreateStory(data)
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

const storySlice = createSlice({
   name: 'story',
   initialState,
   reducers: {
      clearStory: (state) => {
         state.story.story = {}
         state.story.storyIsLoading = false
         state.story.storyIsSuccess = false
         state.story.storyIsError = false
         state.story.storyIsMessage = ''
      },
      clearStories: (state) => {
         state.stories.stories = {}
         state.stories.storiesIsLoading = false
         state.stories.storiesIsSuccess = false
         state.stories.storiesIsError = false
         state.stories.storiesIsMessage = ''
      },
      clearUserStories: (state) => {
         state.userStories.userStories = {}
         state.userStories.userStoriesIsLoading = false
         state.userStories.userStoriesIsSuccess = false
         state.userStories.userStoriesIsError = false
         state.userStories.userStoriesIsMessage = ''
      },
      setPublicStoriesOffset: (state, action) => {
         state.stories.storiesOffset = action.payload
      },
      setUserStoriesOffset: (state, action) => {
         state.userStories.userStoriesOffset = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createStory.pending, (state) => {
            state.story.storyIsLoading = true
         })
         .addCase(createStory.fulfilled, (state, action) => {
            state.story.storyIsError = false
            state.story.storyIsSuccess = true
            state.story.story = action.payload
         })
         .addCase(createStory.rejected, (state, action) => {
            state.story.storyIsLoading = false
            state.story.storyIsSuccess = false
            state.story.storyIsError = true
            state.story.storyIsMessage = action.payload
         })
         .addCase(createStoryText.pending, (state) => {
            state.story.storyIsLoading = true
         })
         .addCase(createStoryText.fulfilled, (state, action) => {
            state.story.storyIsLoading = false
            state.story.storyIsError = false
            state.story.storyIsSuccess = true
            state.story.story = action.payload
         })
         .addCase(createStoryText.rejected, (state, action) => {
            state.story.storyIsLoading = false
            state.story.storyIsSuccess = false
            state.story.storyIsError = true
            state.story.storyIsMessage = action.payload
         })
         .addCase(getStoryById.pending, (state) => {
            state.story.storyIsLoading = true
         })
         .addCase(getStoryById.fulfilled, (state, action) => {
            state.story.storyIsLoading = false
            state.story.storyIsError = false
            state.story.storyIsSuccess = true
            state.story.story = action.payload
         })
         .addCase(getStoryById.rejected, (state, action) => {
            state.story.storyIsLoading = false
            state.story.storyIsSuccess = false
            state.story.storyIsError = true
            state.story.storyIsMessage = action.payload
         })
         .addCase(getAllPublicStories.pending, (state) => {
            state.stories.storiesIsLoading = true
         })
         .addCase(getAllPublicStories.fulfilled, (state, action) => {
            state.stories.storiesIsLoading = false
            state.stories.storiesIsError = false
            state.stories.storiesIsSuccess = true
            state.stories.stories = action.payload
         })
         .addCase(getAllPublicStories.rejected, (state, action) => {
            state.stories.storiesIsLoading = false
            state.stories.storiesIsSuccess = false
            state.stories.storiesIsError = true
            state.stories.stories = {}
            state.stories.storiesIsMessage = action.payload
         })
         .addCase(getMorePublicStories.pending, (state) => {
            state.stories.storiesIsLoading = true
         })
         .addCase(getMorePublicStories.fulfilled, (state, action) => {
            state.stories.storiesIsLoading = false
            state.stories.storiesIsError = false
            state.stories.storiesIsSuccess = true
            state.stories.stories.rows = [
               ...state.stories.stories.rows,
               ...action.payload.rows,
            ]
            state.stories.stories.count = action.payload.count
         })
         .addCase(getMorePublicStories.rejected, (state, action) => {
            state.stories.storiesIsLoading = false
            state.stories.storiesIsSuccess = false
            state.stories.storiesIsError = true
            state.stories.stories = {}
            state.stories.storiesIsMessage = action.payload
         })
         .addCase(getAllUserStories.pending, (state) => {
            state.userStories.userStoriesIsLoading = true
         })
         .addCase(getAllUserStories.fulfilled, (state, action) => {
            state.userStories.userStoriesIsLoading = false
            state.userStories.userStoriesIsError = false
            state.userStories.userStoriesIsSuccess = true
            state.userStories.userStories = action.payload
         })
         .addCase(getAllUserStories.rejected, (state, action) => {
            state.userStories.userStoriesIsLoading = false
            state.userStories.userStoriesIsSuccess = false
            state.userStories.userStoriesIsError = true
            state.userStories.userStories = {}
            state.userStories.userStoriesIsMessage = action.payload
         })
         .addCase(getMoreUserStories.pending, (state) => {
            state.userStories.userStoriesIsLoading = true
         })
         .addCase(getMoreUserStories.fulfilled, (state, action) => {
            state.userStories.userStoriesIsLoading = false
            state.userStories.userStoriesIsError = false
            state.userStories.userStoriesIsSuccess = true
            state.userStories.userStories.rows = [
               ...state.userStories.userStories.rows,
               ...action.payload.rows,
            ]
            state.userStories.userStories.count = action.payload.count
         })
         .addCase(getMoreUserStories.rejected, (state, action) => {
            state.userStories.userStoriesIsLoading = false
            state.userStories.userStoriesIsSuccess = false
            state.userStories.userStoriesIsError = true
            state.userStories.userStories = {}
            state.userStories.userStoriesIsMessage = action.payload
         })
         .addCase(deleteStory.pending, (state) => {
            state.story.storyIsLoading = true
         })
         .addCase(deleteStory.fulfilled, (state, action) => {
            state.story.storyIsLoading = false
            state.story.storyIsError = false
            state.story.storyIsSuccess = true
            state.story.story = action.payload
         })
         .addCase(deleteStory.rejected, (state, action) => {
            state.story.storyIsLoading = false
            state.story.storyIsSuccess = false
            state.story.storyIsError = true
            state.story.storyIsMessage = action.payload
         })
   },
})

export const {
   clearStory,
   clearStories,
   clearUserStories,
   setPublicStoriesOffset,
   setUserStoriesOffset,
} = storySlice.actions
export default storySlice.reducer

// SELECTORS
export const selectStory = (state) => state.story.story
export const selectStories = (state) => state.story.stories
export const selectUserStories = (state) => state.story.userStories
