import axios from '../../../apis/axios'

export const serviceAuthRequestUpdate = async (userData) => {
   const response = await axios.put('/api/auth', userData)
   return response.data
}
export const serviceAuthRequest = async (userData) => {
   const response = await axios.post('/api/auth', userData)
   return response.data
}
