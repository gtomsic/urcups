import axios from '../../../apis/axios'

// Users services here
export const serviceGetUserByLimit = async (data) => {
   const response = await axios.get(`/api/public/${data.limit}/${data.offset}`)
   return response.data
}
