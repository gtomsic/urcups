import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import PrimaryButton from '../../components/PrimaryButton'
import Loader from '../../components/loader/Loader'
import {
   resetUser,
   selectUser,
   verify,
} from '../../store/features/user/userSlice'

const VerifyPage = () => {
   const isFetch = useRef(false)
   const params = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { isLoading, isSuccess, isError, message } = useSelector(selectUser)
   useEffect(() => {
      if (isFetch.current === false) {
         dispatch(verify(params.token))
      }
      return () => {
         isFetch.current = true
      }
   }, [params, dispatch])
   const onClickHandler = () => {
      dispatch(resetUser())
      navigate('/auth')
   }
   return (
      <div className='text-white flex flex-col gap-4'>
         {isLoading ? <Loader>Verifying user...</Loader> : null}
         {isError ? <ErrorMessage>{message}</ErrorMessage> : null}
         {!isSuccess ? null : (
            <>
               <h3>Verification Success</h3>
               <p>You can go and login now.</p>
               <p>Please respects other's privacy. Thank you</p>
               <PrimaryButton onClick={onClickHandler}>Login</PrimaryButton>
            </>
         )}
      </div>
   )
}

export default VerifyPage
