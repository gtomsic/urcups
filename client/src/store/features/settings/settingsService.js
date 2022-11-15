import axios from '../../../apis/axios';

export const serviceSettingsUpdatePassword = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data?.token}`,
      },
   };

   const response = await axios.post('/api/settings/password', data, config);
   return response.data;
};
export const serviceGetSearchOptions = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data?.token}`,
      },
   };

   const response = await axios.get('/api/settings', config);
   return response.data;
};
export const serviceAddUpdateSearchOptions = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data?.token}`,
      },
   };

   const response = await axios.post('/api/settings', data, config);
   return response.data;
};
