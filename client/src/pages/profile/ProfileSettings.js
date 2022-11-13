import React, { useEffect, useRef, useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AccountStatus from '../../components/AccountStatus';
import AttentionMessage from '../../components/AttentionMessage';
import BorderedCard from '../../components/BorderedCard';

import Card from '../../components/Card';
import LastTwelve from '../../components/lastTwelve/LastTwelve';
import SelectOptionBox from '../../components/options/SelectOptionBox';
import PaymentBadge from '../../components/PaymentBadge';
import PrimaryButton from '../../components/PrimaryButton';
import SearchOptions from '../../components/settings/SearchOptions';
import { socket } from '../../socket';
import { selectPayment } from '../../store/features/payment/paymentSlice';
import { selectProfile } from '../../store/features/profile/profileSlice';
import {
   actionChangeOnlineStatus,
   logout,
   selectUser,
} from '../../store/features/user/userSlice';
import { isRightUser } from '../../utils/check';

const ProfileSettings = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { user } = useSelector(selectUser);
   const [status, setStatus] = useState(user?.isOnline);
   const { profile } = useSelector(selectProfile);
   const { paid } = useSelector(selectPayment);

   useEffect(() => {
      isRightUser(user, profile, navigate);
   }, [user, profile, navigate]);

   const logoutHandler = () => {
      const localUser = JSON.parse(localStorage.getItem('user'));
      socket.emit('user', { ...localUser, isOnline: false });
      dispatch(logout(user.id));
   };
   const onChangeStatusHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setStatus(e.target.value);
      dispatch(actionChangeOnlineStatus({ token: user?.token, status }));
   };
   return (
      <div className='flex flex-col gap-20'>
         <Card>
            <div className='flex flex-col gap-3'>
               <h3>General Settings</h3>
               <div className='grid grid-cols-1 gap-11 lg:gap-5 lg:grid-cols-2'>
                  <div className='flex flex-col gap-4'>
                     <BorderedCard>
                        <div className='grid grid-cols-1 gap-4'>
                           <SelectOptionBox
                              value={status}
                              onChange={onChangeStatusHandler}
                              label='Active Status'
                              addClass={
                                 status
                                    ? 'text-white bg-secondary border border-light'
                                    : 'bg-dark text-white border border-light'
                              }
                              data={[
                                 { value: true, label: 'Online' },
                                 { value: false, label: 'Hidden' },
                              ]}
                           />
                           <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                              <PrimaryButton
                                 onClick={() =>
                                    navigate(`/profile/${user?.username}/edit`)
                                 }
                              >
                                 <FaUserEdit /> Edit Profile
                              </PrimaryButton>

                              <PrimaryButton
                                 onClick={logoutHandler}
                                 add='from-danger to-primary'
                              >
                                 <IoLogOut /> Logout
                              </PrimaryButton>
                           </div>
                        </div>
                     </BorderedCard>
                     <LastTwelve />
                  </div>

                  <div>
                     <SearchOptions />
                  </div>
                  <div>
                     {paid?.days > 0 ? (
                        <AttentionMessage title='Supporters Badge!'>
                           <PaymentBadge paid={paid} />
                        </AttentionMessage>
                     ) : (
                        <AccountStatus />
                     )}
                  </div>
               </div>
            </div>
         </Card>
      </div>
   );
};

export default ProfileSettings;
