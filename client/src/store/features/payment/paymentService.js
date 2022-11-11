import axios from '../../../apis/axios';

export const seviceGetAccessStatus = async (token) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   };

   const response = await axios.get('/api/payment/status', config);
   return response.data;
};

export const serviceSupportPayment = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   };

   const response = await axios.post('/api/payment', data, config);
   return response.data;
};

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
