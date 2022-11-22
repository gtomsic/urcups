import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   getPrivatePhotos,
   selectPrivatePhotos,
} from '../../store/features/privatePhotos/privatePhotosSlice';
import {
   getPublicPhotos,
   selectPublicPhotos,
} from '../../store/features/publicPhotos/publicPhotosSlice';
import { selectUser } from '../../store/features/user/userSlice';
import Modal from '../Modal';
import PhotoImage from './PhotoImage';
import './displayPhotos.css';
const DisplayPhotos = ({ onClick, children }) => {
   const dispatch = useDispatch();
   const url = useSelector((state) => state.url);
   const { user } = useSelector(selectUser);
   const { publicPhotos, publicPhotosLimit, publicPhotosOffset } =
      useSelector(selectPublicPhotos);
   const { privatePhotos, privatePhotosOffset, privatePhotosLimit } =
      useSelector(selectPrivatePhotos);
   useEffect(() => {
      dispatch(
         getPublicPhotos({
            user_id: user?.id,
            token: user?.token,
            offset: publicPhotosOffset,
            limit: publicPhotosLimit,
         })
      );
      dispatch(
         getPrivatePhotos({
            user_id: user?.id,
            token: user?.token,
            offset: privatePhotosOffset,
            limit: privatePhotosLimit,
         })
      );
   }, []);
   const onClickHandler = (e, image) => {
      e.preventDefault();
      e.stopPropagation();
      onClick(image);
   };
   return (
      <Modal>
         <div className='w-full overflow-y-auto'>
            <div className='display-photos'>
               {[...publicPhotos?.rows, ...privatePhotos?.rows]?.map((item) => (
                  <PhotoImage
                     onClick={(e) => onClickHandler(e, item.fileName)}
                     key={item.fileName}
                     image={url + item.fileName}
                     item={item}
                  />
               ))}
            </div>
            {children}
         </div>
      </Modal>
   );
};

export default DisplayPhotos;
