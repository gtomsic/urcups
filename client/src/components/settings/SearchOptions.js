import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   actionAddUpdateSearchOption,
   selectSearchOptionSettings,
} from '../../store/features/settings/settingsSlice';
import { selectUser } from '../../store/features/user/userSlice';
import BorderedCard from '../BorderedCard';
import SelectOptionBox from '../options/SelectOptionBox';
import PrimaryButton from '../PrimaryButton';

const ages = [];
const agesTo = [];
const limits = [];
for (let i = 20; i <= 95; i++) {
   ages.push({ value: i, label: i });
   i = i + 4;
}
for (let i = 25; i <= 100; i++) {
   agesTo.push({ value: i, label: i });
   i = i + 4;
}
for (let i = 25; i <= 100; i++) {
   limits.push({ value: i, label: i });
   i = i + 9;
}

const SearchOptions = () => {
   const isFetch = useRef(false);
   const dispatch = useDispatch();
   const { user } = useSelector(selectUser);
   const { searchOptions } = useSelector(selectSearchOptionSettings);
   const [from, setFrom] = useState(searchOptions?.ageFrom);
   const [to, setTo] = useState(searchOptions?.ageTo);
   const [isOnline, setIsOnline] = useState(
      searchOptions?.isOnline ? true : 'All'
   );
   const [limit, setLimit] = useState(searchOptions?.limit);
   const [maritalStatus, setMaritalStatus] = useState(
      searchOptions?.maritalStatus
   );
   const [sexualOrientation, setSexualOrientation] = useState(
      searchOptions?.sexualOrientation
   );

   const onChangeFromHandler = (e) => {
      const value = e.target.value;
      setFrom(Number(value));
      if (Number(value) >= Number(to)) {
         return setTo(Number(value) + 5);
      }
   };
   const onChangeToHandler = (e) => {
      const value = e.target.value;
      setTo(Number(value));
      if (Number(value) <= Number(from)) {
         return setFrom(Number(value) - 5);
      }
   };
   const onSaveOptionsHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const data = {
         ageFrom: from,
         ageTo: to,
         isOnline: isOnline === 'All' ? false : true,
         limit,
         maritalStatus,
         sexualOrientation,
         user_id: user?.id,
         token: user?.token,
      };
      dispatch(actionAddUpdateSearchOption({ ...data, token: user?.token }));
   };
   return (
      <BorderedCard>
         <div className='flex flex-col gap-4'>
            <h4>Search Filter Options</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
               <SelectOptionBox
                  value={from}
                  onChange={onChangeFromHandler}
                  label='Age From'
                  addClass='text-dark bg-white'
                  data={[...ages]}
               ></SelectOptionBox>
               <SelectOptionBox
                  value={to}
                  onChange={onChangeToHandler}
                  label='Age To'
                  addClass='text-dark bg-white'
                  data={[{ value: 100, label: 100 }, ...agesTo]}
               ></SelectOptionBox>
               <SelectOptionBox
                  value={isOnline}
                  onChange={(e) => setIsOnline(e.target.value)}
                  label='Is Online'
                  addClass='text-dark bg-white'
                  data={[
                     { value: 'All', label: 'All' },
                     { value: true, label: 'Online' },
                  ]}
               ></SelectOptionBox>
               <SelectOptionBox
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  label='Limit Per Page'
                  addClass='text-dark bg-white'
                  data={[...limits]}
               ></SelectOptionBox>
               <SelectOptionBox
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
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
                  value={sexualOrientation}
                  onChange={(e) => setSexualOrientation(e.target.value)}
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
               <PrimaryButton onClick={onSaveOptionsHandler} add='w-full'>
                  Save
               </PrimaryButton>
            </div>
         </div>
      </BorderedCard>
   );
};

export default SearchOptions;
