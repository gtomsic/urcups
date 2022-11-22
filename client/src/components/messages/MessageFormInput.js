import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AiFillCamera } from 'react-icons/ai';
import { IoSend, IoCloseSharp } from 'react-icons/io5';
import DisplayPhotos from '../attachment/DisplayPhotos';

const MessageFormInput = ({
   onSubmit,
   onChange,
   body,
   onFocus,
   onSendImage,
}) => {
   const [isPhoto, setIsPhoto] = useState(false);
   const onSendImageHandler = (image) => {
      onSendImage(image);
      setIsPhoto(false);
   };
   const onClickHandler = (e) => {
      e.stopPropagation();
   };
   return ReactDOM.createPortal(
      <div
         onClick={onClickHandler}
         className='fixed z-40 bottom-0 bg-gradient-to-tr from-secondary bg-primary lg:rounded-xl w-full left-0 translate-x-0 lg:max-w-[40%] px-2 py-3 lg:left-[50%] lg:translate-x-[-50%]'
      >
         {!isPhoto ? null : (
            <DisplayPhotos onClick={(image) => onSendImageHandler(image)}>
               <div
                  onClick={() => setIsPhoto(false)}
                  className='z-20 absolute top-0 right-0 p-3 border-spacing-2 text-lg lg:text-2xl text-white border-white border-l-2 border-b-2 rounded-bl-2xl bg-gradient-to-tr from-primary to-secondary cursor-pointer'
               >
                  <IoCloseSharp />
               </div>
            </DisplayPhotos>
         )}
         <form onSubmit={onSubmit} className='flex gap-1'>
            <div
               onClick={(e) => {
                  e.stopPropagation();
                  setIsPhoto(true);
               }}
               className='flex justify-center items-center text-4xl text-white cursor-pointer'
            >
               <AiFillCamera />
            </div>
            <input
               value={body}
               onChange={onChange}
               onFocus={onFocus}
               type='text'
               placeholder='Write your message...'
               className='p-3 bg-white rounded-md flex-1 text-dark'
            />

            <button
               type='submit'
               className='flex justify-center items-center text-4xl text-white cursor-pointer'
            >
               <IoSend />
            </button>
         </form>
      </div>,
      document.querySelector('#message-portal')
   );
};

export default MessageFormInput;
