import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsFillChatTextFill } from 'react-icons/bs'
import { selectProfile } from '../../store/features/profile/profileSlice'

const MessageMenuHandler = () => {
   const navigate = useNavigate()
   const { profile } = useSelector(selectProfile)
   const onClickHandler = (e) => {
      e.stopPropagation()
      navigate(`/messages/${profile.id}`)
   }
   return (
      <div
         onClick={onClickHandler}
         className={`w-full flex-1 flex flex-col items-center justify-center h-[100px] bg-gradient-to-b from-primary rounded-b-3xl bg-danger hover:bg-secondary duration-300 cursor-pointer`}
      >
         <span className='text-md md:text-lg'>
            <BsFillChatTextFill />
         </span>
         <span className='text-xs md:text-sm lg:text-md'>Message</span>
      </div>
   )
}

export default MessageMenuHandler
