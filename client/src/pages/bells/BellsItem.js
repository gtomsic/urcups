import React from 'react'
import moment from 'moment'
import { IoTrashOutline } from 'react-icons/io5'
import { useEffect } from 'react'
import { useState } from 'react'
import { fetchUser } from '../../store/features/user/userService'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const BellsItem = ({ bell, onDelete }) => {
   const isFetch = useRef(false)
   const navigate = useNavigate()
   const [profile, setProfile] = useState({})
   const url = useSelector((state) => state.url)

   useEffect(() => {
      if (isFetch.current === false) {
         const fetchingUser = async () => {
            const response = await fetchUser(bell.user_id)
            setProfile(response)
         }
         fetchingUser()
      }

      return () => {
         isFetch.current = true
      }
   }, [bell])
   const onClickHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      navigate(bell.link)
   }
   const onDeleteBellHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      onDelete(bell.id)
   }
   return (
      <div
         onClick={onClickHandler}
         className={`relative rounded-3xl bg-gradient-to-tr ${
            bell?.isRead == 0
               ? 'from-primary to-secondary shadow-md hover:shadow-secondary'
               : 'from-dark to-darker shadow-md hover:shadow-secondary'
         } duration-300 flex gap-2 overflow-hidden cursor-pointer`}
      >
         <div
            className='relative h-[100px] w-[70px] border-r-2 border-white mr-1'
            style={{
               backgroundImage: `url(${url + profile?.avatar})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
            }}
         >
            {profile?.isOnline ? (
               <>
                  <span
                     className={`z-10 absolute bottom-3 -right-[7px] w-3 h-3 border-2 border-white rounded-full ${
                        profile?.isOnline ? 'bg-secondary' : 'bg-gray'
                     }`}
                  ></span>
                  <span className='z-0 animate-ping absolute bottom-3 -right-[7px] w-3 h-3 inline-flex rounded-full bg-white opacity-95'></span>
               </>
            ) : null}
         </div>
         <div className='my-2 flex-1 text-white'>
            <h4>{profile?.username}</h4>
            <p>{bell?.body}</p>
            <small>{moment(bell?.updatedAt).fromNow()}</small>
         </div>
         <div
            onClick={onDeleteBellHandler}
            className='border-l border-white w-8 flex justify-center items-center text-white bg-primary hover:bg-danger duration-300'
         >
            <IoTrashOutline />
         </div>
      </div>
   )
}

export default BellsItem
