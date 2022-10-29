import axios from '../../../apis/axios'

export const serviceGetStoryById = async (id) => {
   const response = await axios.get(`/api/stories/id/${id}`)
   return response.data
}
export const serviceGetAllUserStories = async ({ limit, offset, id }) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   }
   const response = await axios.get(
      `/api/stories/user/${limit}/${offset}/${id}`,
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
