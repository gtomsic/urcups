import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const ImageViewer = ({ images, index, onClose }) => {
   const [next, setNext] = useState(0)
   const onCloseHandler = (e) => {
      e.stopPropagation()
      onClose()
   }
   const stopClose = (e) => {
      e.stopPropagation()
   }
   return (
      <div
         onClick={stopClose}
         className='relative overflow-hidden h-screen w-full flex justify-center items-center'
      >
         {images.length > 1 ? null : (
            <img
               src={images[index]}
               alt={images[index]}
               className='w-full h-auto xl:w-auto xl:h-full'
            />
         )}
         <div
            onClick={onCloseHandler}
            className='absolute top-0 right-0 p-3 rounded-bl-3xl text-white text-5xl bg-gradient-to-tr from-danger bg-primary'
         >
            <AiOutlineClose />
         </div>
      </div>
   )
}

export default ImageViewer
