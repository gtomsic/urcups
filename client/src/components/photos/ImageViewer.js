import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { useSelector } from 'react-redux'

const ImageViewer = ({ images, index, onClose }) => {
   let [imageIndex, setImageIndex] = useState(index)
   const url = useSelector((state) => state.url)
   const onCloseHandler = (e) => {
      e.stopPropagation()
      onClose()
   }
   const stopClose = (e) => {
      e.stopPropagation()
   }
   const onNextHandler = (e) => {
      e.stopPropagation()
      if (imageIndex === Number(images.length - 1)) {
         setImageIndex(0)
         return
      } else {
         setImageIndex((imageIndex = imageIndex + 1))
      }
   }
   const onPreviousHandler = (e) => {
      e.stopPropagation()
      if (imageIndex === 0) {
         setImageIndex(Number(images.length - 1))
         return
      } else {
         setImageIndex((imageIndex = imageIndex - 1))
      }
   }
   return (
      <div
         onClick={stopClose}
         className='relative overflow-hidden h-screen w-full flex justify-center items-center'
      >
         {images.length > 1 ? (
            <div className='h-full flex items-center justify-center'>
               <img
                  src={
                     url +
                     images[imageIndex].fileName.replace('thumbnail', 'public')
                  }
                  alt={images[imageIndex].fileName}
                  className='w-full h-auto xl:w-auto xl:h-full'
               />
               {/* Previous Button */}
               <div
                  onClick={onPreviousHandler}
                  className='absolute z-20 top-0 left-0 w-[50px] md:w-[200px]  h-screen flex justify-center items-center text-7xl text-light hover:text-white cursor-pointer duration-500'
               >
                  <IoChevronBack />
               </div>
               {/* Next Button */}
               <div
                  onClick={onNextHandler}
                  className='absolute z-20 top-0 right-0 w-[50px] md:w-[200px] h-screen flex justify-center items-center text-7xl text-light hover:text-white cursor-pointer duration-500'
               >
                  <IoChevronForward />
               </div>
            </div>
         ) : (
            <>
               {!images[imageIndex]?.fileName ? (
                  <img
                     src={images[index]}
                     alt={images[index]}
                     className='w-full h-auto xl:w-auto xl:h-full'
                  />
               ) : (
                  <img
                     src={
                        url +
                        images[imageIndex]?.fileName.replace(
                           'thumbnail',
                           'public'
                        )
                     }
                     alt={images[imageIndex]?.fileName}
                     className='w-full h-auto xl:w-auto xl:h-full'
                  />
               )}
            </>
         )}
         <div
            onClick={onCloseHandler}
            className='absolute z-30 top-0 right-0 p-3 rounded-bl-3xl text-white text-2xl lg:text-5xl bg-gradient-to-tr from-danger bg-primary'
         >
            <AiOutlineClose />
         </div>
      </div>
   )
}

export default ImageViewer
