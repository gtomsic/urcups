import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AttentionMessage from '../components/AttentionMessage';
import MessageItem from '../components/messages/MessageItem';
import {
   getAllMessages,
   getMoreMessages,
   selectAllMessages,
   setMessagesOffset,
} from '../store/features/messages/messagesSlice';
import { selectUser } from '../store/features/user/userSlice';

const MessagesPage = () => {
   const isFetch = useRef(false);
   const scrollView = useRef(null);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
   const { user } = useSelector(selectUser);
   const { messages, messagesOffset, messagesLimit } =
      useSelector(selectAllMessages);
   if (!user?.id) {
      localStorage.setItem('redirect', JSON.stringify(location.pathname));
      navigate('/auth');
   }

   useEffect(() => {
      scrollView.current.scrollIntoView();
      if (isFetch.current === false && location.pathname === '/messages') {
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
   }, [dispatch, messagesLimit, messagesOffset, user, location]);

   const onClickHandler = (e, user_id) => {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/messages/${user_id}`);
   };
   const onMoreMessagesHandler = () => {
      dispatch(
         getMoreMessages({
            offset: messagesOffset + 1,
            limit: messagesLimit,
            token: user?.token,
            user_id: user?.id,
         })
      );
      dispatch(setMessagesOffset(messagesOffset + 1));
   };
   return (
      <>
         <div ref={scrollView} />
         {messages?.rows?.length < 1 ? (
            <AttentionMessage title='No messages!'>
               <p>You don't have message at the moment.</p>
               <p>Start browsing profile now!</p>
            </AttentionMessage>
         ) : (
            <div className='relative grid grid-cols-1 gap-1 lg:gap-2 md:grid-cols-2'>
               {messages?.rows?.map((message) => (
                  <div
                     onClick={(e) => onClickHandler(e, message.user_id)}
                     key={message.id}
                     className='shadow-md hover:shadow-secondary duration-300 rounded-3xl'
                  >
                     <MessageItem
                        key={message.id}
                        image={message.avatar}
                        isRead={message.isRead}
                        isOnline={message.isOnline}
                        body={message.body}
                        time={message.createdAt}
                        message={message}
                        isDelete={true}
                     />
                  </div>
               ))}
            </div>
         )}
         {messages?.count === messages?.rows?.length ? null : (
            <div
               onClick={onMoreMessagesHandler}
               className='py-5 my-5 text-center text-white cursor-pointer rounded-md hover:bg-secondary hover:bg-opacity-10'
            >
               <p>More...</p>
            </div>
         )}
      </>
   );
};

export default MessagesPage;
