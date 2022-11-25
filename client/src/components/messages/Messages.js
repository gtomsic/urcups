import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   getAllMessages,
   selectAllMessages,
} from '../../store/features/messages/messagesSlice';
import { selectUser } from '../../store/features/user/userSlice';
import MessageItem from './MessageItem';

const Messages = () => {
   const isFetch = useRef(false);
   const dispatch = useDispatch();
   const { user } = useSelector(selectUser);
   const { messages, messagesOffset, messagesLimit } =
      useSelector(selectAllMessages);

   useEffect(() => {
      if (isFetch.current === false) {
         dispatch(
            getAllMessages({
               offset: 0,
               limit: messagesLimit,
               token: user?.token,
               user_id: user?.id,
            })
         );
      }
      return () => {
         isFetch.current = true;
      };
   }, [messagesLimit, messagesOffset]);
   return (
      <div className='h-[480px] overflow-y-scroll'>
         {messages?.rows?.map((message) => (
            <MessageItem
               key={message.id}
               image={message.avatar}
               isRead={message.isRead}
               isOnline={message.isOnline}
               body={message.body}
               time={message.createdAt}
               message={message}
            />
         ))}
      </div>
   );
};

export default Messages;
