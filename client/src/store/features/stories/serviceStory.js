import axios from '../../../apis/axios'

export const serviceGetAllUserStories = async ({ limit, offset, token }) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   }
   const response = await axios.get(
      `/api/stories/user/${limit}/${offset}`,
      config
   )
   return response.data
}
export const serviceGetAllPublicStories = async ({ limit, offset }) => {
   const response = await axios.get(`/api/stories/${limit}/${offset}`)
   return response.data
}
export const serviceCreateStory = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${data.token}`,
         album: 'story',
         storyTitle: data.title,
         storyBody: data.body,
      },
   }
   const response = await axios.post('/api/stories', data.data, config)
   return response.data
}
