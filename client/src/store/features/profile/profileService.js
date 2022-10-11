import axios from '../../../apis/axios'
export const serviceUpdateProfileInfo = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   }
   const response = await axios.put(
      `/api/users/update-profile-info`,
      data,
      config
   )
   localStorage.setItem('users', JSON.stringify(response.data))
   return response.data
}
export const serviceGetUser = async (username) => {
   const response = await axios.get(`/api/users/${username}`)
   return response.data
}
