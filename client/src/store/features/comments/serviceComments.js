import axios from '../../../apis/axios'

export const serviceCountComments = async (story_id) => {
   const response = await axios.get(`/api/comments/single/${story_id}`)
   return response.data
}

export const seviceDeleteComments = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.delete(`/api/comments/${data.id}`, config)
   return response.data
}

export const serviceUpdateComments = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.put(`/api/comments`, data, config)
   return response.data
}

export const serviceGetComments = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.get(
      `/api/comments/${data.limit}/${data.offset}/${data.story_id}`,
      config
   )
   return response.data
}

export const serviceCreateComment = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.post('/api/comments', data, config)
   return response.data
}
