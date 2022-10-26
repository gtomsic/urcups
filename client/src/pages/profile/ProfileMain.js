import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../../components/Card'
import MoreInformation from './MoreInformation'
import { selectProfile } from '../../store/features/profile/profileSlice'

const Profile = () => {
   const { profile } = useSelector(selectProfile)
   if (!profile?.id) return
   return (
      <>
         <Card>
            <MoreInformation user={profile} />
         </Card>
         <Card>
            {/* Hobbies */}
            <h3>HOBBIES</h3>
            <div className='grid gap-5 grid-cols-2 lg:grid-cols-3'>
               {!profile?.hobbies
                  ? null
                  : profile?.hobbies.split(',').map((hoby, index) => {
                       return (
                          <div
                             key={index}
                             className='py-5 text-center 
               text-white rounded-sm shadow-sm shadow-light'
                          >
                             {hoby}
                          </div>
                       )
                    })}
            </div>
         </Card>

         {/* Looking for */}
         <Card>
            <h3 className='text-white mb-5'>IDEAL PARTNER</h3>
            <div
               dangerouslySetInnerHTML={{ __html: profile?.idealPartner }}
            ></div>
         </Card>
         {/* About Me */}
         <Card>
            <h3 className='text-white mb-5 '>ABOUT ME</h3>
            <div dangerouslySetInnerHTML={{ __html: profile?.about }}></div>
         </Card>
      </>
   )
}

export default Profile
