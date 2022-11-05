import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import _ from 'lodash'
import { socket } from '../../../socket'

import {
   serviceCountAllUnreadMessages,
   serviceGetAllMessages,
   serviceGetMoreMessages,
   serviceGetRoomMessages,
   serviceGetUserProfile,
   serviceReadRoomMessages,
   serviceSendMessage,
} from './serviceMessages'

const initialState = {
   userTyping: false,
   unreadMessages: {
      unreadMessages: 0,
      unreadLoading: false,
      unreadSuccess: false,
      unreadError: false,
      unreadMessage: '',
   },
   messages: {
      messages: {},
      messagesLoading: false,
      messagesSuccess: false,
      messagesError: false,
      messagesMessage: '',
      messagesOffset: 0,
      messagesLimit: 30,
   },
   message: {
      message: {},
      messageLoading: false,
      messageSuccess: false,
      messageError: false,
      messageMessage: '',
      messageLimit: 15,
      messageOffset: 0,
   },
   userProfile: {
      userProfile: {},
      userProfileLoading: false,
      userProfileSuccess: false,
      userProfileError: false,
      userProfileMessage: '',
   },
   readRoomMessages: {
      isRead: null,
      isLoading: false,
      isSucess: false,
      isError: false,
      isMessage: '',
   },
}
export const readRoomMessages = createAsyncThunk(
   'user/readRoomMessages',
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
export const countAllUnreadMessages = createAsyncThunk(
   'user/countAllUnreadMessages',
   async (data, thunkApi) => {
      try {
         const id = thunkApi.getState().messages.userProfile.userProfile.id
         if (id === data.user_id) return
         return await serviceCountAllUnreadMessages(data.token)
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
export const getMoreMessages = createAsyncThunk(
   'user/getMoreMessages',
   async (data, thunkApi) => {
      try {
         return await serviceGetMoreMessages(data)
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
export const getMoreRoomMessages = createAsyncThunk(
   'user/getMoreRoomMessages',
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
export const getRoomMessages = createAsyncThunk(
   'user/getRoomMessages',
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
            message: {},
            messageLoading: false,
            messageSuccess: false,
            messageError: false,
            messageMessage: '',
            limit: 10,
            offset: 0,
         }
      },
      setMessageOffset: (state, action) => {
         state.message.messageOffset = action.payload
      },
      setMessagesOffset: (state, action) => {
         state.messages.messagesOffset = action.payload
      },
      insertMessage: (state, action) => {
         const profileId = state.userProfile.userProfile.id
         if (profileId !== action.payload.user_id) return
         const sortedMessage = _.orderBy(
            [
               ...state.message.message.rows,
               { ...action.payload, isRead: true },
            ],
            'id',
            'asc'
         )
         state.message.message.rows = sortedMessage
      },
      insertMessages: (state, action) => {
         const profileId = state.userProfile.userProfile.id
         if (profileId === action.payload.user_id) return
         const filteredMessages = state.messages.messages.rows.filter(
            (message) => message.user_id !== action.payload.user_id
         )
         state.messages.messages.rows = [
            { ...action.payload, isRead: false },
            ...filteredMessages,
         ]
      },
      updateIsReadMessage: (state, action) => {
         const updated = state.messages.messages.rows.filter(
            (message) => message.user_id === action.payload
         )
         const filteredMessages = state.messages.messages.rows.filter(
            (message) => message.user_id !== action.payload
         )
         state.messages.messages.rows = [
            {
               id: updated[0].id,
               attachment: updated[0].attachment,
               body: updated[0].body,
               roomId: updated[0].roomId,
               isRead: true,
               user_id: updated[0].user_id,
               createdAt: updated[0].createdAt,
               updatedAt: updated[0].updatedAt,
            },
            ...filteredMessages,
         ]
      },
      setIsTypingToFalse: (state, action) => {
         const profileId = state.userProfile.userProfile.id
         if (profileId !== action.payload.user_id) return
         if (!state.userTyping) return
         state.userTyping = action.payload.isTyping
      },
      setIsTypingToTrue: (state, action) => {
         const profileId = state.userProfile.userProfile.id
         if (profileId !== action.payload.user_id) return
         if (state.userTyping) return
         state.userTyping = action.payload.isTyping
      },
      clearRoomProfile: (state) => {
         state.userProfile = {
            userProfile: {},
            userProfileLoading: false,
            userProfileSuccess: false,
            userProfileError: false,
            userProfileMessage: '',
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(sendMessage.pending, (state) => {
            state.message.messageLoading = true
            state.message.messageSuccess = false
         })
         .addCase(sendMessage.fulfilled, (state, action) => {
            state.message.messageLoading = false
            state.message.messageSuccess = true
            const sortedMessage = _.orderBy(
               [...state.message.message.rows, action.payload],
               'id',
               'asc'
            )
            state.message.message.rows = sortedMessage
            socket.emit(`message`, {
               ...action.payload,
            })
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
            const sortedMessages = _.orderBy(action.payload.rows, 'id', 'asc')
            state.message.message.rows = sortedMessages
            state.message.message.count = action.payload.count
         })
         .addCase(getRoomMessages.rejected, (state, action) => {
            state.message.messageLoading = false
            state.message.messageSuccess = false
            state.message.messageError = true
            state.message.message = {}
            state.message.messageMessage = action.payload
         })
         .addCase(getMoreRoomMessages.pending, (state) => {
            state.message.messageLoading = true
         })
         .addCase(getMoreRoomMessages.fulfilled, (state, action) => {
            state.message.messageLoading = false
            state.message.messageSuccess = true
            state.message.messageError = false
            const sortedMessages = _.orderBy(action.payload.rows, 'id', 'asc')
            state.message.message.rows = [
               ...sortedMessages,
               ...state.message.message.rows,
            ]
            state.message.message.count = action.payload.count
         })
         .addCase(getMoreRoomMessages.rejected, (state, action) => {
            state.message.messageLoading = false
            state.message.messageSuccess = false
            state.message.messageError = true
            state.message.message = {}
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
            const sortedMessages = _.orderBy(action.payload.rows, 'id', 'desc')
            state.messages.messages.rows = sortedMessages
            state.messages.messages.count = action.payload.count
         })
         .addCase(getAllMessages.rejected, (state, action) => {
            state.messages.messagesLoading = false
            state.messages.messagesSuccess = false
            state.messages.messagesError = true
            state.messages.messagesMessage = action.payload
         })
         .addCase(getMoreMessages.pending, (state) => {
            state.messages.messagesLoading = true
         })
         .addCase(getMoreMessages.fulfilled, (state, action) => {
            state.messages.messagesLoading = false
            state.messages.messagesSuccess = true
            state.messages.messagesError = false
            const sortedMessages = _.orderBy(action.payload.rows, 'id', 'desc')
            state.messages.messages.rows = [
               ...state.messages.messages.rows,
               ...sortedMessages,
            ]
            state.messages.messages.count = action.payload.count
         })
         .addCase(getMoreMessages.rejected, (state, action) => {
            state.messages.messagesLoading = false
            state.messages.messagesSuccess = false
            state.messages.messagesError = true
            state.messages.messagesMessage = action.payload
         })
         .addCase(countAllUnreadMessages.pending, (state) => {
            state.unreadMessages.unreadLoading = true
         })
         .addCase(countAllUnreadMessages.fulfilled, (state, action) => {
            state.unreadMessages.unreadLoading = false
            state.unreadMessages.unreadSuccess = true
            state.unreadMessages.unreadError = false
            state.unreadMessages.unreadMessages = action.payload
         })
         .addCase(countAllUnreadMessages.rejected, (state, action) => {
            state.unreadMessages.unreadLoading = false
            state.unreadMessages.unreadSuccess = false
            state.unreadMessages.unreadError = true
            state.unreadMessages.unreadMessages = action.payload
         })
         .addCase(readRoomMessages.pending, (state) => {
            state.readRoomMessages.isLoading = true
         })
         .addCase(readRoomMessages.fulfilled, (state, action) => {
            state.readRoomMessages.isLoading = false
            state.readRoomMessages.isSucess = true
            state.readRoomMessages.isError = false
            state.readRoomMessages.isMessage = action.payload
         })
         .addCase(readRoomMessages.rejected, (state, action) => {
            state.readRoomMessages.unreadLoading = false
            state.readRoomMessages.isSucess = false
            state.readRoomMessages.isError = true
            state.readRoomMessages.isMessage = action.payload
         })
   },
})

export const {
   insertMessage,
   insertMessages,
   resetMessage,
   updateIsReadMessage,
   setIsTypingToTrue,
   setIsTypingToFalse,
   clearRoomProfile,
   setMessageOffset,
   setMessagesOffset,
} = messagesSlice.actions
export default messagesSlice.reducer

// SELECTOR
export const selectIsTyping = (state) => state.messages
export const selectUnreadMessages = (state) => state.messages.unreadMessages
export const selectMessage = (state) => state.messages.message
export const selectAllMessages = (state) => state.messages.messages
export const selectMessageUserProfile = (state) => state.messages.userProfile
