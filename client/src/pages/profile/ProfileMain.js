import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/Card'
import MoreInformation from './MoreInformation'
import { selectProfile } from '../../store/features/profile/profileSlice'
import { useEffect } from 'react'
import { selectUser } from '../../store/features/user/userSlice'
import { createBells } from '../../store/features/bells/bellsSlice'

const Profile = () => {
   const isFetch = useRef(false)
   const dispatch = useDispatch()
   const { user } = useSelector(selectUser)
   const { profile } = useSelector(selectProfile)
   useEffect(() => {
      let timerId
      if (profile?.id !== user?.id && user?.id) {
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
   }, [profile])
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
            <h3 className='text-white mb-5'>Ideal Partner</h3>
            <div
               dangerouslySetInnerHTML={{ __html: profile?.idealPartner }}
            ></div>
         </Card>
         {/* About Me */}
         <Card>
            <h3 className='text-white mb-5 '>About Me</h3>
            <div dangerouslySetInnerHTML={{ __html: profile?.about }}></div>
         </Card>
      </>
   )
}

export default Profile
