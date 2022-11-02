import React from 'react'
import moment from 'moment'
import { IoTrashOutline } from 'react-icons/io5'
import { useEffect } from 'react'
import { useState } from 'react'
import { fetchUser } from '../../store/features/user/userService'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const BellsItem = ({ bell }) => {
   const isFetch = useRef(false)
   const navigate = useNavigate()
   const [profile, setProfile] = useState({})
   const url = useSelector((state) => state.url)
   useEffect(() => {
      let timerId = setTimeout(() => {
         const fetchingUser = async () => {
            const response = await fetchUser(bell.user_id)
            setProfile(response)
         }
         fetchingUser()
      }, 200)

      return () => {
         clearTimeout(timerId)
      }
   }, [bell])
   const onClickHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      navigate(`/${bell?.title.toLowerCase()}/${profile?.username}`)
   }
   return (
      <div
         onClick={onClickHandler}
         className='relative rounded-3xl bg-gradient-to-tr from-primary to-secondary flex gap-2 overflow-hidden cursor-pointer'
      >
         <img
            src={url + profile?.avatar}
            alt={profile?.avatar}
            className='max-h-[100px]'
         />
         <div className='my-2 flex-1 text-white'>
            <h4>{profile?.username}</h4>
            <p>Just view your profile</p>
            <small>{moment(bell?.updatedAt).fromNow()}</small>
         </div>
         <div className='border-l border-white w-8 flex justify-center items-center text-white bg-primary hover:bg-danger duration-300'>
            <IoTrashOutline />
         </div>
      </div>
   )
}

export default BellsItem
