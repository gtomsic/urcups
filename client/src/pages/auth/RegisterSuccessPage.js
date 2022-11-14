import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton';
import { actionResetAuth } from '../../store/features/auth/authSlice';
import { resetUser } from '../../store/features/user/userSlice';

const RegisterSuccessPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onClickHandler = () => {
      dispatch(actionResetAuth());
      dispatch(resetUser());
      navigate('/auth');
   };
   return (
      <div className='text-white flex flex-col gap-4'>
         <h3>Registration Success</h3>
         <p>Please check your email.</p>
         <p>And verifiy your urcups email registration before you login. </p>

         <PrimaryButton onClick={onClickHandler}>Okay</PrimaryButton>
      </div>
   );
};

export default RegisterSuccessPage;
