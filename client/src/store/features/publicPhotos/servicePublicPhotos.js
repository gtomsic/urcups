import axios from '../../../apis/axios'

export const serviceGetPublicPhotos = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.get(`/api/photos/${data.user_id}`, config)

   return response.data
}
