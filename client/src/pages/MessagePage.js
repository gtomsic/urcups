import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import PrimaryButton from '../components/PrimaryButton';
import MessageFormInput from '../components/messages/MessageFormInput';
import RightMessage from '../components/messages/RightMessage';
import LeftMessage from '../components/messages/LeftMessage';
import { useDispatch, useSelector } from 'react-redux';
import {
   clearRoomProfile,
   countAllUnreadMessages,
   getMessageUserProfile,
   getMoreRoomMessages,
   getRoomMessages,
   resetMessage,
   selectMessage,
   selectMessageUserProfile,
   sendMessage,
   setMessageOffset,
} from '../store/features/messages/messagesSlice';
import { selectUser } from '../store/features/user/userSlice';
import AttentionMessage from '../components/AttentionMessage';
import MessageProfileCard from '../components/messages/MessageProfileCard';
import Messages from '../components/messages/Messages';
import Avatar from '../components/Avatar';
import { actionBells, countBells } from '../store/features/bells/bellsSlice';
import { socket } from '../socket';
import { serviceCountMessagePerday } from '../store/features/messages/serviceMessages';

const MessagePage = () => {
   const isFetch = useRef(false);
   const scrollEnd = useRef(null);
   const params = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [limitPerday, setLimitPerday] = useState(false);
   const [send, setSend] = useState(false);
   const [onInputFocus, setOnInputFocus] = useState(false);
   const [body, setBody] = useState('');
   const [attachment, setAttachment] = useState([]);
   const [userTyping, setUserTyping] = useState(false);
   const { user } = useSelector(selectUser);
   const { userProfile } = useSelector(selectMessageUserProfile);
   const { message, messageOffset, messageLimit } = useSelector(selectMessage);

   // USE EFFECT THAT MONITOR THE USER IF LOGIN OR NOT
   useEffect(() => {
      if (!user?.id) {
         localStorage.setItem('redirect', JSON.stringify(`/messages`));
         navigate('/auth');
      }
   });

   useEffect(() => {
      if (!user?.id) return;
      const fetchCountPerday = async () => {
         const response = await serviceCountMessagePerday({
            token: user?.token,
         });
         setLimitPerday(response);
      };
      if (user?.id) {
         fetchCountPerday();
      }
   }, [user, message]);

   useEffect(() => {
      if (!user?.id) return;
      const timerId = setTimeout(() => {
         socket.on(`${user?.id}/${params.id}/typing`, (data) => {
            setUserTyping(data.typing);
            scrollEnd.current?.scrollIntoView();
         });
      }, 5000);
      return () => {
         clearTimeout(timerId);
         dispatch(resetMessage());
      };
   }, []);

   useEffect(() => {
      if (!user?.id) return;
      let insedeTimer;
      if (!Boolean(body.trim())) return;
      const timerId = setTimeout(() => {
         socket.emit('typing', {
            typing: true,
            receiver: `${params.id}/${user?.id}/typing`,
         });
         insedeTimer = setTimeout(() => {
            socket.emit('typing', {
               typing: false,
               receiver: `${params.id}/${user?.id}/typing`,
            });
         }, 3000);
      }, 200);
      return () => {
         clearTimeout(timerId);
         clearTimeout(insedeTimer);
      };
   }, [body]);

   useEffect(() => {
      if (!user?.id) return;
      let time = userProfile?.isOnline == false ? 0 : 60000 * 2;
      const timerId = setTimeout(() => {
         if (send === true) {
            dispatch(
               actionBells({
                  subject: `New message from ${user?.username}`,
                  title: `${user?.username} sent you message.`,
                  link: `/messages/${user?.id}`,
                  user_id: userProfile?.id,
                  body: `Check ${
                     user?.sex === 'Male' ? 'his' : 'her'
                  } message? 😄`,
                  token: user?.token,
               })
            );
         }
      }, time);
      return () => {
         clearTimeout(timerId);
      };
   }, [send, message]);
   // USE EFFECT THAT CONTROL THE THE INPUT SHOW
   useEffect(() => {
      if (!user?.id) return;
      return () => {
         setLimitPerday(false);
         dispatch(clearRoomProfile());
      };
   }, []);
   // USE EFFECT THAT CONTROL THE AUTO SCROLL
   useEffect(() => {
      if (!user?.id) return;
      scrollEnd.current?.scrollIntoView();
   }, [onInputFocus]);

   // USE EFFECT THAT THAT IN CHARGE OF GETTING USER PROFILE CURRENT
   // AND GETTING THE ROOM MESSAGES
   // COUNTING THE UNREAD MESSAGES DYNAMITICALLY
   useEffect(() => {
      if (!user?.id) return;
      const fetchSync = async () => {
         if (isFetch.current === true) {
            await dispatch(
               getMessageUserProfile({ user_id: params.id, token: user?.token })
            );
            await dispatch(
               getRoomMessages({
                  offset: 0,
                  limit: messageLimit,
                  token: user?.token,
                  user_id: params.id,
               })
            );
            await dispatch(
               countAllUnreadMessages({ token: user?.token, user_id: user.id })
            );
            dispatch(countBells({ token: user?.token }));
            scrollEnd.current?.scrollIntoView();
         }
      };
      fetchSync();
      return () => {
         isFetch.current = true;
      };
   }, [params, user, dispatch]);

   // ON SEND MESSAGE HANDLER IN CHARGE OF SENDING MESSAGE
   const onSendHandler = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const data = {
         body,
         attachment: attachment.length > 0 ? attachment.join(',') : '',
         receiver: params.id,
      };
      if (!Boolean(body.trim())) return;
      await dispatch(sendMessage({ data, token: user?.token }));
      setSend(true);
      setBody('');
      socket.emit('typing', {
         typing: false,
         receiver: `${params.id}/${user?.id}/typing`,
      });
      scrollEnd.current?.scrollIntoView();
   };
   const onMoreMessage = async () => {
      await dispatch(
         getMoreRoomMessages({
            offset: messageOffset + 1,
            limit: messageLimit,
            token: user?.token,
            user_id: params.id,
         })
      );
      await dispatch(setMessageOffset(messageOffset + 1));
   };
   if (!user?.id) return;
   return (
      <div className='flex gap-8'>
         <div
            id='messages'
            className='flex-1 h-[80vh] overflow-y-auto pt-[80px]'
         >
            {message?.rows?.length < 1 ? (
               <AttentionMessage
                  title={`Are you interested in ${userProfile?.username}`}
               >
                  <p>
                     Send {userProfile?.sex === 'Male' ? 'him' : 'her'} your
                     message to start conversation.
                  </p>
                  <p>
                     And connect maybe{' '}
                     {userProfile?.sex === 'Male' ? 'his' : 'shes'} the one you
                     you're waiting for.
                  </p>
                  <p>
                     For more info view{' '}
                     {userProfile?.sex === 'Male' ? 'his' : 'her'} profile.
                  </p>
                  <div className='mt-5'>
                     <Link to={`/profile/${userProfile?.username}`}>
                        <PrimaryButton add='from-secondary bg-primary'>
                           <h3>View</h3>
                           <Avatar image={userProfile?.avatar} />{' '}
                           <h3>{userProfile?.username}</h3>
                        </PrimaryButton>
                     </Link>
                  </div>
               </AttentionMessage>
            ) : (
               <>
                  {message?.count === message?.rows?.length ? null : (
                     <div
                        onClick={onMoreMessage}
                        className='py-5 my-5 text-center text-white cursor-pointer rounded-md hover:bg-secondary hover:bg-opacity-10'
                     >
                        <p>More...</p>
                     </div>
                  )}
                  {message?.rows?.map((content) => {
                     if (content?.user_id !== user?.id) {
                        return (
                           <LeftMessage
                              key={content?.id}
                              profile={userProfile}
                              message={content}
                           >
                              {content?.body}
                           </LeftMessage>
                        );
                     } else {
                        return (
                           <RightMessage
                              key={content?.id}
                              profile={user}
                              message={content}
                           >
                              {content?.body}
                           </RightMessage>
                        );
                     }
                  })}
               </>
            )}
            {userTyping ? (
               <LeftMessage profile={userProfile}>
                  <div className='relative h-6 min-w-[90px] flex justify-between pr-4'>
                     <small>Typing</small>
                     <span className='typing'></span>
                  </div>
               </LeftMessage>
            ) : null}
            {!limitPerday ? (
               <AttentionMessage title={`Exceeded the limit.`}>
                  <p>Your limit per day is done.</p>
                  <p>If you like to unlimited access.</p>
                  <p>Try supporting the site.</p>
                  <br />
                  <PrimaryButton
                     onClick={() =>
                        navigate(`/profile/${user?.username}/settings`)
                     }
                  >
                     Support The Site
                  </PrimaryButton>
               </AttentionMessage>
            ) : null}
            <div ref={scrollEnd} />
         </div>
         <div className='hidden lg:block '>
            <MessageProfileCard />
            <div className='roundex-2xl w-[350px] h-auto rounded-2xl p-5 border border-darker'>
               <div className='flex justify-between p-3'>
                  <h3 className='text-light'>Messages</h3>
                  <Link to='/messages'>
                     <h3 className='text-light hover:text-secondary'>
                        View All
                     </h3>
                  </Link>
               </div>
               <Messages />
            </div>
         </div>
         {!limitPerday ? null : (
            <MessageFormInput
               onSubmit={onSendHandler}
               attachment={(item) =>
                  setAttachment((currentValues) => [...currentValues, item])
               }
               onFocus={() => setOnInputFocus(!onInputFocus)}
               body={body}
               onChange={(e) => setBody(e.target.value)}
            />
         )}
      </div>
   );
};

export default MessagePage;
