import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import _ from 'lodash'
import {
   serviceGetRoomMessages,
   serviceGetUserProfile,
   serviceSendMessage,
} from './serviceMessages'

const initialState = {
   messages: {
      messages: [],
      messagesLoading: false,
      messagesSuccess: false,
      messagesError: false,
      messagesMessage: '',
      limit: 30,
      offset: 0,
   },
   message: {
      message: [],
      messageLoading: false,
      messageSuccess: false,
      messageError: false,
      messageMessage: '',
      limit: 30,
      offset: 0,
   },
   userProfile: {
      userProfile: {},
      userProfileLoading: false,
      userProfileSuccess: false,
      userProfileError: false,
      userProfileMessage: '',
   },
}
export const getMessageUserProfile = createAsyncThunk(
   'user/getMessageUserProfile',
   async (data, thunkApi) => {
      try {
         return await serviceGetUserProfile(data)
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
export const getRoomMessages = createAsyncThunk(
   'user/getRoomMessage',
   async (data, thunkApi) => {
      try {
         return await serviceGetRoomMessages(data)
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
export const sendMessage = createAsyncThunk(
   'user/sendMessage',
   async (data, thunkApi) => {
      try {
         return await serviceSendMessage(data)
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

const messagesSlice = createSlice({
   name: 'messages',
   initialState,
   reducers: {
      resetMessage: (state) => {
         state.message.message = {
            message: [],
            messageLoading: false,
            messageSuccess: false,
            messageError: false,
            messageMessage: '',
            limit: 30,
            offset: 0,
         }
      },
      insertMessage: (state, action) => {
         state.message = [...state.message.message, action.payload]
      },
      insertMessages: (state, action) => {
         state.messages = [...state.messages.messages, action.payload]
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(sendMessage.pending, (state) => {
            state.message.messageLoading = true
         })
         .addCase(sendMessage.fulfilled, (state, action) => {
            state.message.messageLoading = false
            state.message.messageSuccess = true
            const sortedMessage = _.orderBy(
               [...state.message.message, action.payload],
               'id',
               'asc'
            )
            state.message.message = sortedMessage
         })
         .addCase(sendMessage.rejected, (state, action) => {
            state.message.messageLoading = false
            state.message.messageError = true
            state.message.messageMessage = action.payload
         })
         .addCase(getRoomMessages.pending, (state) => {
            state.message.messageLoading = true
         })
         .addCase(getRoomMessages.fulfilled, (state, action) => {
            state.message.messageLoading = false
            state.message.messageSuccess = true
            const sortedMessages = _.orderBy(action.payload, 'id', 'asc')
            state.message.message = sortedMessages
         })
         .addCase(getRoomMessages.rejected, (state, action) => {
            state.message.messageLoading = false
            state.message.messageError = true
            state.message.messageMessage = action.payload
         })
         .addCase(getMessageUserProfile.pending, (state) => {
            state.userProfile.userProfileLoading = true
         })
         .addCase(getMessageUserProfile.fulfilled, (state, action) => {
            state.userProfile.userProfileLoading = false
            state.userProfile.userProfileSuccess = true
            state.userProfile.userProfile = action.payload
         })
         .addCase(getMessageUserProfile.rejected, (state, action) => {
            state.userProfile.userProfileLoading = false
            state.userProfile.userProfileError = true
            state.userProfile.userProfileMessage = action.payload
         })
   },
})

export const { insertMessage, insertMessages, resetMessage } =
   messagesSlice.actions
export default messagesSlice.reducer

// SELECTOR
export const selectMessage = (state) => state.messages.message
export const selectMessageUserProfile = (state) => state.messages.userProfile
