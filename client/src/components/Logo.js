import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo192.png'
import logoName from '../assets/urcups256.png'
import { IoChevronBack } from 'react-icons/io5'
import PrimaryButton from './PrimaryButton'

const Logo = () => {
   const location = useLocation()
   const navigate = useNavigate()
   const isTrue =
      location.pathname.includes('/messages') ||
      location.pathname.includes('/profile') ||
      location.pathname.includes('/bells') ||
      location.pathname.includes('/favorites') ||
      location.pathname.includes('/stories')
   const onBackHandler = (e) => {
      e.stopPropagation()
      e.preventDefault()
      navigate(-1)
   }
   return (
      <>
         <div>
            {isTrue ? (
               <PrimaryButton
                  onClick={onBackHandler}
                  add='bg-secondary hover:from-primary'
               >
                  <IoChevronBack />
               </PrimaryButton>
            ) : (
               <>
                  <div
                     className='w-10 aspect-square rounded-full border-2 border-primary md:block lg:hidden'
                     style={{
                        backgroundImage: `url(${logo})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                     }}
                  ></div>
                  <img
                     src={logoName}
                     alt='Urcups Logo'
                     className='max-w-[120px] hidden lg:block'
                  />
               </>
            )}
         </div>
      </>
   )
}

export default Logo
