import axios from '../../../apis/axios'

export const serviceAddPublicPhotos = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${data.token}`,
         album: 'public',
      },
   }
   const response = await axios.post(
      '/api/photos/public/add',
      data.data,
      config
   )
   return response.data
}

export const serviceDeletePublicPhotos = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }

   const response = await axios.post(`api/photos/public`, data, config)
   return response.data
}

export const serviceGetPublicPhotos = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.get(
      `/api/photos/${data.user_id}/${data.limit}/${data.offset}`,
      config
   )

   return response.data
}
