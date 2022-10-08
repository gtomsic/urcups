import React from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../../components/forms/TextInput'

const RegisterSuccessPage = () => {
   return (
      <div className='text-white flex flex-col gap-4'>
         <h3>Registration Success</h3>
         <p>Please check your email.</p>
         <p>And verifiy your urcups email registration before you login. </p>
         <Link to='/auth'>
            <TextInput type='button' value='Okay' bg='bg-secondary' />
         </Link>
      </div>
   )
}

export default RegisterSuccessPage
