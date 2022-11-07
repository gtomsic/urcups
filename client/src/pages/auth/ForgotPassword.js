import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AttentionMessage from '../../components/AttentionMessage';
import ErrorMessage from '../../components/ErrorMessage';
import TextInput from '../../components/forms/TextInput';
import Loader from '../../components/loader/Loader';
import Modal from '../../components/Modal';
import PrimaryButton from '../../components/PrimaryButton';
import {
   actionAuthRequest,
   actionResetAuth,
   selectAuth,
} from '../../store/features/auth/authSlice';
import { selectUser } from '../../store/features/user/userSlice';

const ForgotPassword = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [email, setEmail] = useState('');
   const { user } = useSelector(selectUser);
   const { auth, authLoading, authSuccess, authError, authMessage } =
      useSelector(selectAuth);
   useEffect(() => {
      if (user?.id) {
         navigate('/');
      }
   }, [user]);
   const onSubmitHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!Boolean(email.trim())) return;
      dispatch(actionAuthRequest({ email }));
      setEmail('');
   };
   const onBackHandler = () => {
      dispatch(actionResetAuth());
      navigate('/');
   };
   return (
      <>
         {auth?.token && authSuccess ? (
            <AttentionMessage title={`Request success!`}>
               <p>Please check your email.</p>
               <p>And proceed the next steps.</p>
               <br />
               <PrimaryButton onClick={onBackHandler} add='w-full'>
                  Okay
               </PrimaryButton>
            </AttentionMessage>
         ) : (
            <form onSubmit={onSubmitHandler} className='relative'>
               {authError ? <ErrorMessage>{authMessage}</ErrorMessage> : null}
               {authLoading ? (
                  <Modal>
                     <Loader>Checking Credentials...</Loader>
                  </Modal>
               ) : null}
               <div className='text-white text-center'>
                  <h3>Request New Password</h3>
               </div>
               <TextInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='text'
                  name='username'
                  label='Email'
                  title='Your Email'
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
                     onClick={() => navigate('/auth')}
                     type='button'
                     add='from-gray to-dark hover:from-primary'
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

export default ForgotPassword;
