import axios from '../../../apis/axios'

export const serviceAddPrivatePhotos = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${data.token}`,
         album: 'public',
      },
   }
   const response = await axios.post(
      '/api/photos/private/add',
      data.data,
      config
   )
   return response.data
}

export const serviceDeletePrivatePhotos = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }

   const response = await axios.post(`api/photos/private`, data, config)
   return response.data
}

export const serviceGetPrivatePhotos = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.get(
      `/api/photos/private/${data.user_id}/${data.limit}/${data.offset}`,
      config
   )

   return response.data
}
