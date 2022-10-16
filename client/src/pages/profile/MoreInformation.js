import React from 'react'

const MoreInformation = ({ user }) => {
   return (
      <>
         <h3>MORE INFORMATION</h3>
         <div className='grid grid-cols-1 gap-1 md:grid-cols-2'>
            <div className='grid grid-cols-2'>
               <span>Marital Status:</span>
               <span>{user.maritalStatus}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Sexual Orientation:</span>
               <span>{user.sexualOrientation}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Children:</span>
               <span>{user.children}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Looking For:</span>
               <span>{user.lookingFor}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Height:</span>
               <span>{user?.height}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Race:</span>
               <span>{user.race}</span>
            </div>{' '}
            <div className='grid grid-cols-2'>
               <span>Body Type:</span>
               <span>{user.bodyType}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Education:</span>
               <span>{user.education}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Occupation:</span>
               <span>{user.occupation}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Smoking:</span>
               <span>{user.smoking}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Drinking:</span>
               <span>{user.dringking}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Language:</span>
               <span>{user.language}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Astrology:</span>
               <span>{user.astrology}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Hair Color:</span>
               <span>{user.hairColor}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Eye Color:</span>
               <span>{user.eyeColor}</span>
            </div>
            <div className='grid grid-cols-2'>
               <span>Religion:</span>
               <span>{user.religion}</span>
            </div>
         </div>
      </>
   )
}

export default MoreInformation
