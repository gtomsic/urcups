import React, { useRef } from 'react'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectProfile } from '../../store/features/profile/profileSlice'
import { selectUser } from '../../store/features/user/userSlice'
import {
   createBells,
   readBell,
   selectBells,
} from '../../store/features/bells/bellsSlice'

import Card from '../../components/Card'
import MoreInformation from './MoreInformation'

const Profile = () => {
   const isFetch = useRef(false)
   const dispatch = useDispatch()
   const { user } = useSelector(selectUser)
   const { profile } = useSelector(selectProfile)
   const { bellsOffset, bellsLimit } = useSelector(selectBells)
   useEffect(() => {
      if (isFetch.current === false) {
         if (!user?.id) return
         dispatch(
            readBell({
               user_id: profile?.id,
               limit: bellsLimit,
               offset: bellsOffset,
               token: user?.token,
            })
         )
      }
      return () => {
         isFetch.current = true
      }
   }, [profile, bellsLimit, bellsOffset, user, dispatch])
   useEffect(() => {
      let timerId
      if (profile?.id !== user?.id && user?.id && isFetch.current === false) {
         timerId = setTimeout(() => {
            dispatch(
               createBells({
                  title: 'viewedProfiles',
                  user_id: profile?.id,
                  token: user?.token,
               })
            )
         }, 500)
      }
      return () => {
         clearTimeout(timerId)
      }
   })
   if (!profile?.id) return
   return (
      <>
         <Card>
            <MoreInformation user={profile} />
         </Card>
         <Card>
            {/* Hobbies */}
            <h3>Hobbies</h3>
            <div className='grid gap-5 grid-cols-2 lg:grid-cols-3'>
               {!profile?.hobbies
                  ? null
                  : profile?.hobbies.split(',').map((hoby, index) => (
                       <div
                          key={index}
                          className='py-5 text-center 
               text-white rounded-sm shadow-sm shadow-light'
                       >
                          {hoby}
                       </div>
                    ))}
            </div>
         </Card>

         {/* Looking for */}
         <Card>
            <h3 className='text-white'>Ideal Partner</h3>
            <div
               dangerouslySetInnerHTML={{ __html: profile?.idealPartner }}
            ></div>
         </Card>
         {/* About Me */}
         <Card>
            <h3 className='text-white '>About Me</h3>
            <div dangerouslySetInnerHTML={{ __html: profile?.about }}></div>
         </Card>
      </>
   )
}

export default Profile
