import axios from '../../../apis/axios';

export const serviceGetPaypalId = async (token) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   };

   const response = await axios.get('/api/payment', config);
   return response.data;
};
