import React from 'react'
import TextInput from '../forms/TextInput'
import PrimaryButton from '../PrimaryButton'

const CommentsForm = ({ value, onChange, onSubmit }) => {
   return (
      <form onSubmit={onSubmit} className='flex px-2  gap-1 items-center'>
         <div className='flex-1'>
            <TextInput
               value={value}
               onChange={onChange}
               title='Write your comments...'
            />
         </div>
         <button className='p-[16px] bg-gradient-to-tr from-primary to-secondary hover:to-danger duration-300 text-white rounded-md border border-white'>
            Submit
         </button>
      </form>
   )
}

export default CommentsForm
