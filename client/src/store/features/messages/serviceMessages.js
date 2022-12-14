import axios from '../../../apis/axios';

export const serviceDeleteMessage = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   };
   const response = await axios.delete(`/api/messages/${data.roomId}`, config);
   return response.data;
};

export const serviceCountMessagePerday = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   };
   const response = await axios.get(`/api/messages/perday`, config);
   return response.data;
};

export const serviceGetMoreMessages = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   };
   const response = await axios.post(`/api/messages/more`, data, config);
   const newArray = [];
   response.data.rows.filter((item) => {
      if (Number(item.messages.length) === 1 && item.sender !== data.user_id) {
         return newArray.push({
            ...item.messages[0],
            user_id: item.sender,
         });
      } else {
         return newArray.push({
            ...item.messages[0],
            user_id: item.receiver,
         });
      }
   });

   return { rows: newArray, count: response.data.count };
};

export const serviceReadRoomMessages = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   };
   const response = await axios.post(
      `/api/messages/read`,
      { roomId: data.roomId },
      config
   );

   return response.data;
};

export const serviceCountAllUnreadMessages = async (token) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.get(`/api/messages/count`, config);
   return response.data;
};

export const serviceGetAllMessages = async (data) => {
   const { limit, offset, token, user_id } = data;
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.get(`/api/messages/${limit}/${offset}`, config);
   const newArray = [];
   response.data.rows.filter((item) => {
      if (Number(item.messages.length) === 1 && item.sender !== user_id) {
         return newArray.push({
            ...item.messages[0],
            user_id: item.sender,
         });
      } else {
         return newArray.push({
            ...item.messages[0],
            user_id: item.receiver,
         });
      }
   });

   return { rows: newArray, count: response.data.count };
};

export const serviceGetUserProfile = async (data) => {
   const { user_id, token } = data;
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   };

   const response = await axios.get(`/api/users/user/${user_id}`, config);
   return response.data;
};

export const serviceGetRoomMessages = async (data) => {
   const { user_id, limit, offset, token } = data;
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   };

   const response = await axios.get(
      `/api/messages/room/${limit}/${offset}/${user_id}`,
      config
   );
   return response.data;
};
export const serviceSendMessage = async (data) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${data.token}`,
      },
   };

   const response = await axios.post('/api/messages', data.data, config);
   return response.data;
};
