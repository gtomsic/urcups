import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import _ from 'lodash'
import { socket } from '../../../socket'

import {
   serviceCountAllUnreadMessages,
   serviceGetAllMessages,
   serviceGetRoomMessages,
   serviceGetUserProfile,
   serviceSendMessage,
} from './serviceMessages'

const initialState = {
   unreadMessages: {
      unreadMessages: 0,
      unreadLoading: false,
      unreadSuccess: false,
      unreadError: false,
      unreadMessage: '',
   },
   messages: {
      messages: [],
      messagesLoading: false,
      messagesSuccess: false,
      messagesError: false,
      messagesMessage: '',
      messagesLimit: 15,
      messagesOffset: 0,
   },
   message: {
      message: [],
      messageLoading: false,
      messageSuccess: false,
      messageError: false,
      messageMessage: '',
      messageLimit: 30,
      messageOffset: 0,
   },
   userProfile: {
      userProfile: {},
      userProfileLoading: false,
      userProfileSuccess: false,
      userProfileError: false,
      userProfileMessage: '',
   },
}
export const countAllUnreadMessage = createAsyncThunk(
   'user/countAllUnreadMessages',
   async (token, thunkApi) => {
      try {
         return await serviceCountAllUnreadMessages(token)
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
export const getAllMessages = createAsyncThunk(
   'user/getAllMessages',
   async (data, thunkApi) => {
      try {
         return await serviceGetAllMessages(data)
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
         state.message = {
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
         const profileId = state.userProfile.userProfile.id
         if (profileId !== action.payload.user_id) return
         const sortedMessage = _.orderBy(
            [...state.message.message, action.payload],
            'id',
            'asc'
         )
         state.message.message = sortedMessage
         // state.message = [...state.message.message, action.payload]
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
            socket.emit('sendMessage', action.payload)
            const sortedMessage = _.orderBy(
               [...state.message.message, action.payload],
               'id',
               'asc'
            )
            state.message.message = sortedMessage
         })
         .addCase(sendMessage.rejected, (state, action) => {
            state.message.messageLoading = false
            state.message.messageSuccess = false
            state.message.messageError = true
            state.message.messageMessage = action.payload
         })
         .addCase(getRoomMessages.pending, (state) => {
            state.message.messageLoading = true
         })
         .addCase(getRoomMessages.fulfilled, (state, action) => {
            state.message.messageLoading = false
            state.message.messageSuccess = true
            state.message.messageError = false
            const sortedMessages = _.orderBy(action.payload, 'id', 'asc')
            state.message.message = sortedMessages
         })
         .addCase(getRoomMessages.rejected, (state, action) => {
            state.message.messageLoading = false
            state.message.messageSuccess = false
            state.message.messageError = true
            state.message.message = []
            state.message.messageMessage = action.payload
         })
         .addCase(getMessageUserProfile.pending, (state) => {
            state.userProfile.userProfileLoading = true
         })
         .addCase(getMessageUserProfile.fulfilled, (state, action) => {
            state.userProfile.userProfileLoading = false
            state.userProfile.userProfileSuccess = true
            state.userProfile.userProfileError = false
            state.userProfile.userProfile = action.payload
         })
         .addCase(getMessageUserProfile.rejected, (state, action) => {
            state.userProfile.userProfileLoading = false
            state.userProfile.userProfileSuccess = false
            state.userProfile.userProfileError = true
            state.userProfile.userProfileMessage = action.payload
         })
         .addCase(getAllMessages.pending, (state) => {
            state.messages.messagesLoading = true
         })
         .addCase(getAllMessages.fulfilled, (state, action) => {
            state.messages.messagesLoading = false
            state.messages.messagesSuccess = true
            state.messages.messagesError = false
            const sortedMessages = _.orderBy(action.payload, 'id', 'desc')
            state.messages.messages = sortedMessages
         })
         .addCase(getAllMessages.rejected, (state, action) => {
            state.messages.messagesLoading = false
            state.messages.messagesSuccess = false
            state.messages.messagesError = true
            state.messages.messagesMessage = action.payload
         })
         .addCase(countAllUnreadMessage.pending, (state) => {
            state.unreadMessages.unreadLoading = true
         })
         .addCase(countAllUnreadMessage.fulfilled, (state, action) => {
            state.unreadMessages.unreadLoading = false
            state.unreadMessages.unreadSuccess = true
            state.unreadMessages.unreadError = false
            state.unreadMessages.unreadMessages = action.payload
         })
         .addCase(countAllUnreadMessage.rejected, (state, action) => {
            state.unreadMessages.unreadLoading = false
            state.unreadMessages.unreadSuccess = false
            state.unreadMessages.unreadError = true
            state.unreadMessages.unreadMessage = action.payload
         })
   },
})

export const { insertMessage, insertMessages, resetMessage } =
   messagesSlice.actions
export default messagesSlice.reducer

// SELECTOR
export const selectUnreadMessages = (state) => state.messages.unreadMessages
export const selectMessage = (state) => state.messages.message
export const selectAllMessages = (state) => state.messages.messages
export const selectMessageUserProfile = (state) => state.messages.userProfile
