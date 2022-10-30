import axios from '../../../apis/axios'

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
