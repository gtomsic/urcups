import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   actionResetPassowrd,
   actionUpdatePasswordSettings,
   selectSettings,
} from '../store/features/settings/settingsSlice';
import { selectUser } from '../store/features/user/userSlice';
import AttentionMessage from './AttentionMessage';
import BorderedCard from './BorderedCard';
import ErrorMessage from './ErrorMessage';
import TextInput from './forms/TextInput';
import Loader from './loader/Loader';
import PrimaryButton from './PrimaryButton';

const ChangePassword = () => {
   const dispatch = useDispatch();
   const [isEdit, setIsEdit] = useState(false);
   const [oldPass, setOldPass] = useState('');
   const [newPass, setNewPass] = useState('');
   const [confirmNewPass, setConfirmNewPass] = useState('');
   const { user } = useSelector(selectUser);
   const { password, passwordLoading, passwordError, passwordMessage } =
      useSelector(selectSettings);
   useEffect(() => {
      return () => {
         dispatch(actionResetPassowrd());
      };
   }, []);
   const editHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(actionResetPassowrd());
      setIsEdit(true);
   };
   const onUpdatePasswordHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const data = {
         newPass,
         oldPass,
         confirmNewPass,
         token: user?.token,
      };
      setIsEdit(false);
      dispatch(actionUpdatePasswordSettings(data));
      setOldPass('');
      setNewPass('');
      setConfirmNewPass('');
   };
   return !isEdit ? (
      <>
         {passwordError ? <ErrorMessage>{passwordMessage}</ErrorMessage> : null}
         {passwordLoading ? <Loader>Updating...</Loader> : null}
         {password ? (
            <AttentionMessage title={`Password changed success.`}>
               <p>Your password changed complete.</p>
            </AttentionMessage>
         ) : null}
         <PrimaryButton onClick={editHandler}>Update Password</PrimaryButton>
      </>
   ) : (
      <BorderedCard>
         <TextInput
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            name='oldPassword'
            label='Old Password'
            title='Old Password'
            type='password'
            bg='text-dark bg-light'
         />
         <TextInput
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            name='newPassword'
            label='New Password'
            title='New Password'
            type='password'
            bg='text-dark bg-light'
         />
         <TextInput
            value={confirmNewPass}
            onChange={(e) => setConfirmNewPass(e.target.value)}
            name='confirmPassword'
            label='Confirm Password'
            title='Confirm Password'
            type='password'
            bg='text-dark bg-light'
         />
         <div className='grid grid-cols-2 gap-2'>
            <PrimaryButton
               onClick={() => setIsEdit(false)}
               add='w-full from-dark to-gray hover:from-primary'
            >
               Cancel
            </PrimaryButton>
            <PrimaryButton onClick={onUpdatePasswordHandler} add='w-full'>
               Submit
            </PrimaryButton>
         </div>
      </BorderedCard>
   );
};

export default ChangePassword;
