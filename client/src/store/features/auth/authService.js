import axios from '../../../apis/axios';

export const serviceAuthRequestUpdate = async (userData) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${userData.token}`,
      },
   };
   const response = await axios.put('/api/auth', userData, config);
   return response.data;
};
export const serviceAuthRequest = async (userData) => {
   const response = await axios.post('/api/auth', userData);
   return response.data;
};
