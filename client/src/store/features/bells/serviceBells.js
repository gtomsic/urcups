import axios from '../../../apis/axios'

export const serviceGetBells = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.get(
      `/api/bells/${data.limit}/${data.offset}`,
      config
   )
   return response.data
}
export const serviceCreateBells = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.post(`/api/bells/profile`, data, config)
   return response.data
}
