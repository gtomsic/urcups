import axios from '../../../apis/axios'

export const serviceCountLoves = async ({ story_id }) => {
   const response = await axios.get(`/api/loves/counts/${story_id}`)
   return response.data
}
export const serviceCheckLove = async ({ story_id, token }) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   }
   const response = await axios.get(`/api/loves/${story_id}`, config)
   return response.data
}

export const serviceAddRemoveLoves = async ({ story_id, token }) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   }

   const response = await axios.post('/api/loves', { story_id }, config)
   return response.data
}
