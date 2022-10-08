import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import TextInput from '../../components/forms/TextInput'
import Loader from '../../components/loader/Loader'
import { selectUser, verify } from '../../store/features/user/userSlice'

const VerifyPage = () => {
   const isFetch = useRef(false)
   const params = useParams()
   const dispatch = useDispatch()
   const { isLoading, isSuccess, isError, message } = useSelector(selectUser)
   useEffect(() => {
      if (isFetch.current === false) {
         dispatch(verify(params.token))
      }
      return () => {
         isFetch.current = true
      }
   }, [params, dispatch])
   return (
      <div className='text-white flex flex-col gap-4'>
         {isLoading ? <Loader>Verifying user...</Loader> : null}
         {isError ? <ErrorMessage>{message}</ErrorMessage> : null}
         {!isSuccess ? null : (
            <>
               <h3>Verification Success</h3>
               <p>You can go and login now.</p>
               <p>Please respects other's privacy. Thank you</p>
               <Link to='/auth'>
                  <TextInput
                     type='button'
                     value='Go To Login'
                     bg='bg-secondary bg-gradient-to-bl from-primary hover:bg-warning duration-300'
                  />
               </Link>
            </>
         )}
      </div>
   )
}

export default VerifyPage
