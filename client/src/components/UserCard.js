import React from 'react'
import wallpaper from '../assets/wallpaper.png'
import userImage from '../assets/gabriel.png'
import Avatar from './Avatar'
import { useSelector } from 'react-redux'

function UserCard({ wallpaper, image, username, age, location, isOnline }) {
   const url = useSelector((state) => state.url)
   return (
      <div
         style={{
            backgroundImage: `url(${url + wallpaper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
         }}
         className='w-full group gap-1 md:ga-3 min-h-[200px] max-w-[200px] relative rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary duration-300 cursor-pointer'
      >
         <div
            className={
               !isOnline
                  ? 'absolute bottom-0 pt-7 h-[150px] w-full flex flex-col items-center text-white bg-gradient-to-t from-dark group-hover:from-primary duration-300'
                  : 'absolute bottom-0 pt-7 h-[150px] w-full flex group-hover:from-primary duration-300 flex-col items-center text-white bg-gradient-to-t from-dark'
            }
         >
            <h4>{age}</h4>
            <h5>{username}</h5>
            <small>{location}</small>
            <Avatar
               border={isOnline ? true : false}
               image={image}
               isOnline={isOnline}
            />
         </div>
      </div>
   )
}

UserCard.defaultProps = {
   wallpaper: wallpaper,
   image: userImage,
   username: 'Administrator',
   age: '39',
   location: 'United States',
   isOnline: true,
}

export default UserCard
