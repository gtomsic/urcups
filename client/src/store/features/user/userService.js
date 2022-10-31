import axios from '../../../apis/axios'
import _ from 'lodash'

export const fetchUser = _.memoize(async (user_id) => {
   const response = await axios.get(`/api/public/${user_id}`)
   return response.data
})

export const serviceUpdateWallpaper = async (formData) => {
   const config = {
      headers: {
         'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${formData.token}`,
      },
   }
   const response = await axios.post(
      '/api/users/wallpaper',
      formData.data,
      config
   )
   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
   }
   return response.data
}

export const serviceUpdateAvatar = async (formData) => {
   const config = {
      headers: {
         'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${formData.token}`,
      },
   }
   const response = await axios.post('/api/users/avatar', formData.data, config)
   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
   }
   return response.data
}

export const serviceVerifiyUser = async (token) => {
   const response = await axios.get(`/api/users/verify/${token}`)
   return response.data
}

export const serviceRegister = async (userData) => {
   const response = await axios.post('/api/users', userData)
   return response.data
}

export const serviceLogin = async (userData) => {
   const response = await axios.post('/api/users/login', userData)
   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
   }
   return response.data
}

export const serviceLogout = (user_id) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   }
   const response = axios.put(`/api/users/logout`, { id: user_id }, config)
   localStorage.removeItem('user')
   return response.data
}
