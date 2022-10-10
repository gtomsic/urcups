import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../../store/features/user/userSlice'

export const CheckUser = () => {
   const navigate = useNavigate()
   const { user } = useSelector(selectUser)
   useEffect(() => {
      if (!user?.id) {
         navigate('/auth')
      }
   }, [user, navigate])
   return null
}

export const ComparedUser = ({ children }) => {
   const { user } = useSelector(selectUser)
   const { profile } = useSelector(selectUser)
   const [isTrue, setIsTrue] = useState(false)
   console.log(children)
   useEffect(() => {
      if (user?.id === profile?.id) {
         setIsTrue(true)
      }
   }, [user, profile])

   return isTrue ? true : false
}
