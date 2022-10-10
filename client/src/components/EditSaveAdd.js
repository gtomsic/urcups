import React from 'react'
import { useSelector } from 'react-redux'
import { selectProfile } from '../store/features/profile/profileSlice'
import { selectUser } from '../store/features/user/userSlice'
import { check } from '../utils/check'

const EditSaveAdd = ({ select, onSave, cancel }) => {
   const { user } = useSelector(selectUser)
   const { profile } = useSelector(selectProfile)
   return (
      <>
         {check(user, profile) ? (
            <div className='flex gap-2 bg-dark bg-opacity-50 p-2 rounded-md'>
               {!select ? null : (
                  <div
                     onClick={cancel}
                     className='bg-gradient-to-tr from-primary bg-secondary hover:bg-danger duration-300 rounded-md px-5 py-2 cursor-pointer'
                  >
                     Cancel
                  </div>
               )}
               <div
                  onClick={onSave}
                  className={`bg-gradient-to-tr from-primary bg-secondary hover:bg-danger duration-300 rounded-md px-5 py-2 cursor-pointer ${
                     select ? 'bg-secondary' : null
                  }`}
               >
                  {select ? 'Save' : 'Edit'}
               </div>
               {select ? null : (
                  <div className='bg-gradient-to-tr from-primary bg-secondary hover:bg-danger duration-300 rounded-md px-5 py-2 cursor-pointer'>
                     Add
                  </div>
               )}
            </div>
         ) : (
            <div></div>
         )}
      </>
   )
}

export default EditSaveAdd
