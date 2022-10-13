import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5'

import PrimaryButton from '../components/PrimaryButton'
import MessageFormInput from '../components/MessageFormInput'
import RightMessage from '../components/messages/RightMessage'
import LeftMessage from '../components/messages/LeftMessage'

const MessagePage = () => {
   const navigate = useNavigate()
   const [openInput, setOpenInput] = useState(false)
   useEffect(() => {
      setOpenInput(true)
      return () => {
         setOpenInput(false)
      }
   }, [])
   const onBackHandler = (e) => {
      e.stopPropagation()
      navigate(-1)
   }
   return (
      <div className='flex gap-11'>
         <div
            id='messages'
            className='flex-1 max-h-[80vh] overflow-y-auto py-[80px]'
         >
            <div className='fixed z-20 top-[80px] md:top-[110px] ml-3 inline-block'>
               <PrimaryButton onClick={onBackHandler}>
                  <IoChevronBack /> BACK
               </PrimaryButton>
            </div>
            <LeftMessage>Hello there! how are you.</LeftMessage>
            <RightMessage>I'm doing good. thank for asking.</RightMessage>
            <LeftMessage>
               Hello there! how are you. Lorem ipsum dolor sit amet consectetur
               adipisicing elit. Quo magnam beatae iste, natus dolorum fuga
               adipisci, eius nihil rem molestiae nemo mollitia quasi. Animi,
               nobis reiciendis. Id, sed? Quis, est.
            </LeftMessage>
            <RightMessage>I'm doing good. thank for asking.</RightMessage>
            <RightMessage>I'm doing good. thank for asking.</RightMessage>
            <LeftMessage>Hello there! how are you.</LeftMessage>
            <LeftMessage>
               Hello there! how are you. Lorem ipsum dolor sit amet consectetur
               adipisicing elit. Sunt reiciendis, exercitationem sed dicta
               consequatur autem fugit, enim omnis quo tempora distinctio,
               aliquid optio cupiditate quia iusto mollitia modi perferendis
               non.
            </LeftMessage>
            <RightMessage>
               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
               Exercitationem voluptate nemo vitae similique deleniti
               recusandae. Magni, veniam quisquam quibusdam obcaecati a voluptas
               iure minus facilis tempore! Culpa dolore perferendis sed. I'm
               doing good. thank for asking.
            </RightMessage>
            <RightMessage>I'm doing good. thank for asking.</RightMessage>
            <RightMessage>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
               explicabo nobis ab voluptas nam impedit, mollitia molestias.
               Nobis, atque. Cumque quidem neque, laboriosam eaque facere alias
               debitis suscipit nihil labore. I'm doing good. thank for asking.
            </RightMessage>
            <RightMessage>I'm doing good. thank for asking.</RightMessage>
            <LeftMessage>
               Wou you care to chat and get to know each other?
            </LeftMessage>
         </div>
         <div className='roundex-2xl w-[350px] max-h-[80vh] hidden lg:block bg-darker rounded-2xl p-5'>
            <h3>Messages</h3>
         </div>
         {!openInput ? null : <MessageFormInput />}
      </div>
   )
}

export default MessagePage
