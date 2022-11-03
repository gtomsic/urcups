import axios from '../../../apis/axios'

export const serviceReadBell = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.put(`/api/bells/read`, data, config)
   return response.data
}

export const serviceDeleteBell = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.delete(
      `/api/bells/${data.limit}/${data.offset}/${data.id}`,
      config
   )
   return response.data
}

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
export const serviceBellAction = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.post(`/api/bells/action`, data, config)
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
