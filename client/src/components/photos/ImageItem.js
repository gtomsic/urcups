import React, { useEffect, useRef, useState } from 'react'
import { FaTrash, FaCheck } from 'react-icons/fa'

const ImageItem = ({
   onDelete,
   onRemove,
   fileName,
   onClick,
   select,
   toDelete,
   image,
}) => {
   let [spans, setSpans] = useState(0)
   const [isSet, setIsSet] = useState(false)
   const process = useRef(false)
   const imageRef = useRef()
   useEffect(() => {
      if (process.current === false) {
         imageRef.current.addEventListener('load', setSpansHandler)
      }
      return () => {
         process.current = true
      }
   }, [])
   useEffect(() => {
      const item = toDelete.find((img) => img === fileName)
      if (item) {
         return setIsSet(true)
      } else {
         return setIsSet(false)
      }
   }, [toDelete, fileName])
   const setSpansHandler = () => {
      const height = imageRef.current.clientHeight
      const spans = Math.ceil(height / 10)
      setSpans(spans)
   }
   const onSelectDeleteHandler = (e, file) => {
      e.stopPropagation()
      if (isSet) {
         return onRemove(file)
      } else {
         return onDelete(file)
      }
   }
   return (
      <div
         onClick={onClick}
         style={{
            gridRowEnd: `span ${spans}`,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
         }}
         className='group relative overflow-hidden'
      >
         {select ? (
            <div
               onClick={(e) => onSelectDeleteHandler(e, fileName)}
               className={`absolute z-10 cursor-pointer p-3 m-2 bg-white bg-opacity-30 rounded-md ${
                  isSet ? 'bg-opacity-100' : null
               }`}
            >
               {!isSet ? (
                  <span className='text-danger'>
                     <FaTrash />
                  </span>
               ) : (
                  <span className='text-secondary'>
                     <FaCheck />
                  </span>
               )}
            </div>
         ) : null}
         <div className='absolute bottom-0 h-[100%] w-full bg-gradient-to-t group-hover:from-dark group-hover:duration-500 cursor-pointer'></div>
         <img
            ref={imageRef}
            src={image}
            alt={fileName}
            className='z-0 group-hover:cursor-pointer shadow-2xl group-hover:shadow-secondary group-hover:duration-500 opacity-0'
         />
      </div>
   )
}

export default ImageItem
