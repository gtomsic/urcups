import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import TextInput from '../../components/forms/TextInput'
import Loader from '../../components/loader/Loader'
import Modal from '../../components/Modal'
import PrimaryButton from '../../components/PrimaryButton'
import { login, selectUser } from '../../store/features/user/userSlice'

const ForgotPassword = () => {
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const { user } = useSelector(selectUser)
   const { isLoading, isSuccess, isError, message } = useSelector(selectUser)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   useEffect(() => {
      if (user?.id) {
         navigate('/')
      }
   }, [user])
   const onSubmitHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log('Submited')
   }
   return (
      <form onSubmit={onSubmitHandler} className='relative'>
         {isError ? <ErrorMessage>{message}</ErrorMessage> : null}
         {isLoading ? (
            <Modal isActive={true}>
               <Loader>Checking Credentials...</Loader>
            </Modal>
         ) : null}

         <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            name='password'
            label='Password'
            title='Password'
         />
         <TextInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            name='confirmPassword'
            label='Confirm Passsword'
            title='Confirm Password'
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
               add='from-primary to-dark'
            >
               Back
            </PrimaryButton>
            <PrimaryButton type='submit'>Submit</PrimaryButton>
         </div>
      </form>
   )
}

export default ForgotPassword
