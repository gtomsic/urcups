import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

import {
   selectPublicPhotos,
   setPublicPhotosOffset,
} from '../store/features/publicPhotos/publicPhotosSlice'

const PreviousNext = ({ pages }) => {
   const dispatch = useDispatch()
   const { publicPhotosOffset } = useSelector(selectPublicPhotos)
   const onPreviousHandler = (e) => {
      e.stopPropagation()
      const num = publicPhotosOffset - 1
      dispatch(setPublicPhotosOffset(num))
   }
   const onNextHandler = (e) => {
      e.stopPropagation()
      const num = publicPhotosOffset + 1
      dispatch(setPublicPhotosOffset(num))
   }
   return (
      <div className='flex gap-2 bg-dark bg-opacity-50 p-2 rounded-md'>
         {pages > 1 ? (
            <>
               {publicPhotosOffset > 0 ? (
                  <div
                     onClick={onPreviousHandler}
                     className='flex justify-center items-center bg-gradient-to-tr from-primary bg-secondary hover:bg-danger 
                     duration-300 rounded-md px-5 py-2 cursor-pointer'
                  >
                     <IoChevronBack />
                  </div>
               ) : null}
               <div
                  className='flex justify-center items-center bg-gradient-to-tr from-primary bg-danger duration-300 
         rounded-md px-2 py-2 cursor-pointer'
               >
                  {publicPhotosOffset === pages - 1 ? null : (
                     <>
                        <small>{publicPhotosOffset + 1}</small> /
                     </>
                  )}
                  <small>{pages}</small>
               </div>
               {publicPhotosOffset + 1 === pages ? null : (
                  <div
                     onClick={onNextHandler}
                     className='flex justify-center items-center bg-gradient-to-tr from-primary bg-secondary hover:bg-danger 
                  duration-300 rounded-md px-5 py-2 cursor-pointer'
                  >
                     <IoChevronForward />
                  </div>
               )}
            </>
         ) : (
            <div
               className='flex justify-center items-center bg-gradient-to-tr from-primary bg-danger duration-300 
      rounded-md px-2 py-2 cursor-pointer'
            >
               {publicPhotosOffset === pages - 1 ? null : (
                  <>
                     <small>{publicPhotosOffset + 1}</small> /
                  </>
               )}
               <small>{pages}</small>
            </div>
         )}
      </div>
   )
}

export default PreviousNext
