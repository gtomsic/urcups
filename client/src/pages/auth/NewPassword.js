import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AttentionMessage from '../../components/AttentionMessage';
import ErrorMessage from '../../components/ErrorMessage';
import TextInput from '../../components/forms/TextInput';
import Loader from '../../components/loader/Loader';
import Modal from '../../components/Modal';
import PrimaryButton from '../../components/PrimaryButton';
import {
   actionAuthRequestUpdate,
   actionResetAuth,
   selectAuth,
} from '../../store/features/auth/authSlice';
import { selectUser } from '../../store/features/user/userSlice';

const NewPassword = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const params = useParams();
   const [error, setError] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const { user } = useSelector(selectUser);
   const { auth, authLoading, authSuccess, authError, authMessage } =
      useSelector(selectAuth);

   useEffect(() => {
      if (!params.token || !params.email || user?.id) {
         navigate('/');
      }
   }, [user]);
   const onSubmitHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (password !== confirmPassword)
         return setError(`Password don't match try again.`);
      if (!Boolean(password.trim()) || !Boolean(confirmPassword.trim()))
         return setError('All filleds are required.');
      dispatch(
         actionAuthRequestUpdate({
            email: params?.email,
            password,
            token: params?.token,
         })
      );
      setPassword('');
      setConfirmPassword('');
   };

   const onLoginHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(actionResetAuth());
      navigate('/auth');
   };

   return (
      <>
         {auth?.id && authSuccess ? (
            <AttentionMessage title={`Password successfully updated!`}>
               <p>Please proceed to login</p>
               <br />
               <PrimaryButton onClick={onLoginHandler} add='w-full'>
                  Login
               </PrimaryButton>
            </AttentionMessage>
         ) : (
            <form onSubmit={onSubmitHandler} className='relative'>
               {authError || error ? (
                  <ErrorMessage>{authMessage || error}</ErrorMessage>
               ) : null}
               {authLoading ? (
                  <Modal>
                     <Loader>Updating Credentials...</Loader>
                  </Modal>
               ) : null}

               <TextInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                  name='password'
                  label='New Password'
                  title='New Password'
               />
               <TextInput
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type='password'
                  name='confirmPassword'
                  label='Confirm New Password'
                  title='Confirm New Password'
               />
               <div className='p-4'>
                  <p className='text-light'>
                     No account with us.{' '}
                     <Link to='/auth/register' className='text-secondary ml-3'>
                        Signup Now!
                     </Link>
                  </p>
               </div>
               <div className='w-full grid grid-cols-2 gap-2'>
                  <PrimaryButton
                     onClick={onLoginHandler}
                     type='button'
                     add='from-primary to-dark'
                  >
                     Back
                  </PrimaryButton>
                  <PrimaryButton type='submit'>Submit</PrimaryButton>
               </div>
            </form>
         )}
      </>
   );
};

export default NewPassword;
