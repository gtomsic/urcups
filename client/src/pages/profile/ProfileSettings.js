import React, { useEffect, useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BorderedCard from '../../components/BorderedCard';

import Card from '../../components/Card';
import LastTwelve from '../../components/lastTwelve/LastTwelve';
import SelectOptionBox from '../../components/options/SelectOptionBox';
import PrimaryButton from '../../components/PrimaryButton';
import { selectProfile } from '../../store/features/profile/profileSlice';
import { logout, selectUser } from '../../store/features/user/userSlice';
import { isRightUser } from '../../utils/check';

const ages = [];
const limits = [];
for (let i = 21; i <= 100; i++) {
   ages.push({ value: i, label: i });
   i = i + 5;
}
for (let i = 18; i <= 76; i++) {
   limits.push({ value: i, label: i });
   i = i + 18;
}

const ProfileSettings = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { user } = useSelector(selectUser);
   const { profile } = useSelector(selectProfile);
   const price = [
      { price: 20, label: '3 Months' },
      { price: 30, label: '6 Months' },
      { price: 50, label: '1 year' },
   ];
   useEffect(() => {
      isRightUser(user, profile, navigate);
   }, [user, profile, navigate]);
   const logoutHandler = () => {
      dispatch(logout(user.id));
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
                              label='Active Status'
                              addClass={
                                 user?.isOnline
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
                              <div className='col-span-1 md:col-span-2'>
                                 <SelectOptionBox
                                    label='Sexual Orientation'
                                    addClass='text-dark bg-white'
                                    data={[
                                       { value: 'All', label: 'All' },
                                       { value: 'Straight', label: 'Straight' },
                                    ]}
                                 ></SelectOptionBox>
                              </div>
                           </div>
                           <div className='col-span-1 md:col-span-2'>
                              <PrimaryButton add='w-full'>Save</PrimaryButton>
                           </div>
                        </div>
                     </BorderedCard>
                  </div>
                  <div className='flex flex-col gap-8 p-3 border border-light rounded-xl'>
                     <div>
                        <h3>Free account</h3>
                        <ul>
                           <li>All free account can enjoy unlimited chat.</li>
                           <li>You can views unlimited user profile.</li>
                           <li>Limited to 2 private messages a day.</li>
                           <li>Not allowed to view public photos.</li>
                           <li>
                              Not allowed to interact and view readers activity.
                           </li>
                           <li>Not allowed to block any users.</li>
                        </ul>
                     </div>
                     <div>
                        <h3>Supporters account</h3>
                        <ul>
                           <li>
                              Besides the benefits of free account more to
                              follows
                           </li>
                           <li>
                              Supported member can have unlimited private
                              messages.
                           </li>
                           <li>Supported member can view public photos.</li>
                           <li>Supported member can bookmark user profile.</li>
                           <li>
                              Supported member can view loves and comment to
                              stories activity.
                           </li>
                        </ul>
                     </div>
                     <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
                        {price.map((support) => (
                           <div
                              key={support.price}
                              className='flex flex-col gap-1 p-5 justify-center items-center cursor-pointer rounded-lg bg-gradient-to-bl from-primary bg-secondary hover:bg-danger duration-300'
                           >
                              <h3>${support.price} USD</h3>
                              <p>{support.label}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </Card>
      </div>
   );
};

export default ProfileSettings;
