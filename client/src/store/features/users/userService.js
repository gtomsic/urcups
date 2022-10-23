import axios from '../../../apis/axios'

// Users services here
export const serviceGetUserByLimit = async (data) => {
   const response = await axios.post(`/api/public`, data)
   return response.data
}
