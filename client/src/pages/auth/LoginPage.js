import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import TextInput from '../../components/forms/TextInput';
import Loader from '../../components/loader/Loader';
import Modal from '../../components/Modal';
import PrimaryButton from '../../components/PrimaryButton';
import { login, selectUser } from '../../store/features/user/userSlice';

const LoginPage = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { user } = useSelector(selectUser);
   const { isLoading, isSuccess, isError, message } = useSelector(selectUser);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   useEffect(() => {
      if (user?.id) {
         navigate('/');
      }
   }, [user]);
   useEffect(() => {
      const redirect = JSON.parse(localStorage.getItem('redirect'));
      if (isSuccess) {
         if (redirect) {
            navigate(redirect);
            localStorage.removeItem('redirect');
            return;
         } else {
            navigate('/');
         }
      }
   }, [isSuccess, dispatch, navigate]);
   const onSubmitHandler = (e) => {
      e.preventDefault();
      const data = { email, password };
      dispatch(login(data));
   };
   return (
      <form onSubmit={onSubmitHandler} className='relative'>
         {isError ? <ErrorMessage>{message}</ErrorMessage> : null}
         {isLoading ? (
            <Modal isActive={true}>
               <Loader>Checking Credentials...</Loader>
            </Modal>
         ) : null}
         <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            name='username'
            label='Email'
            title='Email'
         />

         <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            name='password'
            label='Password'
            title='Password'
         />
         <div className='p-4'>
            <p className='text-light'>
               No account with us.{' '}
               <Link to='/auth/register' className='text-secondary ml-3'>
                  Signup Now!
               </Link>
            </p>
         </div>
         <PrimaryButton type='submit' add='w-full'>
            Login
         </PrimaryButton>
         <div className='p-4'>
            <p className='text-light'>
               Forgot password{' '}
               <Link to='/auth/request' className='text-secondary ml-3'>
                  Reset your password here!
               </Link>
            </p>
         </div>
      </form>
   );
};

export default LoginPage;
