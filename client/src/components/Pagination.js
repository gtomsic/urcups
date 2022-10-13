import React, { useEffect, useState } from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

const Pagination = ({ offset, limit, onClick, count }) => {
   let [steps, setSteps] = useState(0)
   let [pages, setPages] = useState([])
   let [stop, setStop] = useState()
   useEffect(() => {
      const createArr = []
      let number = Math.floor(count / limit) + 1
      for (let i = 0; i < number; i++) {
         createArr.push(i)
      }
      const newArr = createArr.splice(steps * 5, 5)
      setPages(newArr)
   }, [count, offset, steps, limit])
   useEffect(() => {
      const num = Math.floor(Math.floor(count / limit) / 5) + 1
      setStop(num)
   }, [steps, count, limit])
   const onPrevious = () => {
      if (steps === 0) return
      let num = steps - 1
      setSteps(num)
   }
   const onNext = () => {
      if (steps === stop) return
      let num = steps + 1
      setSteps(num)
   }
   return (
      <div className='flex gap-2 mt-10 justify-center w-full'>
         {steps === 0 ? null : (
            <div
               onClick={onPrevious}
               className='flex items-center p-3  border border-white rounded-md text-white cursor-pointer bg-gradient-to-tr from-danger bg-primary'
            >
               <IoChevronBack />
            </div>
         )}

         {pages.map((item) => {
            return (
               <div
                  onClick={() => onClick(item)}
                  key={item}
                  className={`p-3  border border-white rounded-md text-white cursor-pointer bg-gradient-to-tr hover:from-secondary ${
                     offset === item
                        ? 'from-secondary bg-primary '
                        : 'from-danger bg-primary'
                  }`}
               >
                  {item + 1}
               </div>
            )
         })}
         {steps === stop || pages.length < 5 ? null : (
            <div
               onClick={onNext}
               className='flex items-center p-3  border border-white rounded-md text-white cursor-pointer bg-gradient-to-tr from-danger bg-primary'
            >
               <IoChevronForward />
            </div>
         )}
      </div>
   )
}

export default Pagination
