import axios from '../../../apis/axios'

export const serviceGetUserProfile = async (data) => {
   const { user_id, token } = data
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   }

   const response = await axios.get(`/api/users/user/${user_id}`, config)
   return response.data
}
export const serviceGetRoomMessages = async (data) => {
   const { user_id, limit, offset, token } = data
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   }

   const response = await axios.get(
      `/api/messages/room/${limit}/${offset}/${user_id}`,
      config
   )
   return response.data
}
export const serviceSendMessage = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }

   const response = await axios.post('/api/messages', data.data, config)
   return response.data
}
