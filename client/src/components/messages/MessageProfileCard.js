import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectMessageUserProfile } from '../../store/features/messages/messagesSlice'

const MessageProfileCard = () => {
   const url = useSelector((state) => state.url)
   const { userProfile } = useSelector(selectMessageUserProfile)
   return (
      <Link to={`/profile/${userProfile?.username}`}>
         <div className='flex gap-3 items-center bg-gradient-to-tr from-primary bg-danger p-5 rounded-xl mb-5'>
            <div
               className='relative w-[70px] h-[70px] rounded-full xl:rounded-r-full xl:rounded-b-full xl:mt-[-15px] xl:ml-[-15px] xl:border-4 border-white mr-1'
               style={{
                  backgroundImage: `url(${url + userProfile.avatar})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
               }}
            >
               {userProfile.isOnline ? (
                  <>
                     <span className='z-10 absolute bottom-[7px] right-[-4px] w-4 h-4 border-2 border-white rounded-full bg-secondary'></span>
                     <span className='animate-ping z-0 absolute bottom-[7px] right-[-4px] w-4 h-4  inline-flex rounded-full bg-white opacity-75'></span>
                  </>
               ) : null}
            </div>

            <div className='flex-1 flex flex-col text-white'>
               <h4 className='text-white'>{userProfile?.username}</h4>
               <small>
                  {userProfile?.age} / {userProfile.sex}
               </small>
               <small>{`${userProfile?.city} ${userProfile?.stateProvince} ${userProfile?.country}`}</small>
            </div>
         </div>
      </Link>
   )
}

export default MessageProfileCard
