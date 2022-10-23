import axios from '../../../apis/axios'

export const serviceAddRemoveFavorites = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.post('/api/favorites', data, config)

   return response.data
}

export const serviceCheckFavorites = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.get(`/api/favorites/${data.profileId}`, config)

   return response.data
}

export const serviceGetAllFavorites = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.get(
      `/api/favorites/all/${data.offset}/${data.limit}`,
      config
   )

   return { data: response.data.rows, count: response.data.count }
}
