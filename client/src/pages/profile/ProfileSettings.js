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
import { socket } from '../../socket';
import { selectPayment } from '../../store/features/payment/paymentSlice';
import { selectProfile } from '../../store/features/profile/profileSlice';
import {
   actionChangeOnlineStatus,
   logout,
   selectUser,
} from '../../store/features/user/userSlice';
import { isRightUser } from '../../utils/check';

const ages = [];
const limits = [];
for (let i = 20; i <= 100; i++) {
   ages.push({ value: i, label: i });
   i = i + 4;
}
for (let i = 25; i <= 100; i++) {
   limits.push({ value: i, label: i });
   i = i + 9;
}

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
                     <BorderedCard>
                        <div className='flex flex-col gap-4'>
                           <h4>Search Filter Options</h4>
                           <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                              <SelectOptionBox
                                 label='Age From'
                                 addClass='text-dark bg-white'
                                 data={[...ages]}
                              ></SelectOptionBox>
                              <SelectOptionBox
                                 label='Age To'
                                 addClass='text-dark bg-white'
                                 data={[{ value: 100, label: 100 }, ...ages]}
                              ></SelectOptionBox>
                              <SelectOptionBox
                                 label='Is Online'
                                 addClass='text-dark bg-white'
                                 data={[
                                    { value: 'All', label: 'All' },
                                    { value: true, label: 'Online' },
                                 ]}
                              ></SelectOptionBox>
                              <SelectOptionBox
                                 label='Limit Per Page'
                                 addClass='text-dark bg-white'
                                 data={[...limits]}
                              ></SelectOptionBox>
                              <SelectOptionBox
                                 label='Marital Status'
                                 addClass='text-dark bg-white'
                                 data={[
                                    { value: 'All', label: 'All' },
                                    { value: 'Single', label: 'Single' },
                                    { value: 'Married', label: 'Married' },
                                    { value: 'Window', label: 'Window' },
                                    { value: 'Divorced', label: 'Divorced' },
                                    {
                                       value: 'Complicated',
                                       label: 'Complicated',
                                    },
                                 ]}
                              ></SelectOptionBox>
                              <SelectOptionBox
                                 label='Sexual Orientation'
                                 addClass='text-dark bg-white'
                                 data={[
                                    { value: 'All', label: 'All' },
                                    { value: 'Straight', label: 'Straight' },
                                    { value: 'Gay', label: 'Gay' },
                                    { value: 'Bi', label: 'Bi' },
                                    { value: 'Lesbian', label: 'Lesbian' },
                                    {
                                       value: 'Transgender',
                                       label: 'Transgender',
                                    },
                                 ]}
                              ></SelectOptionBox>
                           </div>
                           <div className='col-span-1 md:col-span-2'>
                              <PrimaryButton add='w-full'>Save</PrimaryButton>
                           </div>
                        </div>
                     </BorderedCard>
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
