import React from 'react'
import { useSelector } from 'react-redux'
import myAvatar from '../assets/avatar.jpg'

const Avatar = ({ image, border, isOnline }) => {
   const url = useSelector((state) => state.url)
   return (
      <div
         className='w-10 aspect-square rounded-full relative border-2 border-white'
         style={{
            backgroundImage: `url(${url + image})`,
            backgroundSize: 'cover',
         }}
      >
         {isOnline ? (
            <>
               <span className='z-10 absolute bottom-[-3px] right-0 w-3 h-3 border-2 border-white rounded-full bg-secondary'></span>
               <span className='z-0 animate-ping absolute bottom-[-3px] right-0 w-3 h-3 inline-flex rounded-full bg-white opacity-95'></span>
            </>
         ) : null}
      </div>
   )
}

Avatar.defaultProps = {
   image: myAvatar,
   border: false,
   isOnline: false,
}

export default Avatar
