import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { selectProfile } from '../../store/features/profile/profileSlice';
import {
   addPublicPhotos,
   deletePublicPhotos,
   getPublicPhotos,
   resetPhotos,
   selectPublicPhotos,
   setPublicPhotosOffset,
} from '../../store/features/publicPhotos/publicPhotosSlice';
import { selectUser } from '../../store/features/user/userSlice';
import AttentionMessage from '../../components/AttentionMessage';
import PhotoLayout from '../../components/photos/PhotoLayout';
import { useNavigate, useParams } from 'react-router-dom';

const ProfilePhotos = () => {
   const [pages, setPages] = useState(null);
   const [select, setSelect] = useState(false);
   const [toDelete, setToDelete] = useState([]);
   const { user } = useSelector(selectUser);
   const { profile } = useSelector(selectProfile);
   const dispatch = useDispatch();
   const params = useParams();
   const navigate = useNavigate();
   const {
      publicPhotos,
      isPublicPhotosLoading,
      isPublicPhotosError,
      publicPhotosOffset,
      publicPhotosLimit,
   } = useSelector(selectPublicPhotos);

   useEffect(() => {
      if (!user?.id) {
         return navigate('/');
      }
   }, [user]);

   useEffect(() => {
      const timerId = setTimeout(() => {
         dispatch(
            getPublicPhotos({
               user_id: profile?.id,
               token: user?.token,
               offset: publicPhotosOffset,
               limit: publicPhotosLimit,
            })
         );
      }, 200);
      return () => {
         dispatch(resetPhotos());
         clearTimeout(timerId);
      };
   }, [
      dispatch,
      publicPhotosOffset,
      publicPhotosLimit,
      profile?.id,
      user?.token,
   ]);

   useEffect(() => {
      dispatch(setPublicPhotosOffset(0));
   }, [params?.username]);

   useEffect(() => {
      if (publicPhotos?.count) {
         const num = Math.ceil(publicPhotos?.count / publicPhotosLimit);
         setPages(num);
      }
   }, [publicPhotos?.count, publicPhotosLimit]);

   const onSaveHandler = () => {
      if (select) {
         if (toDelete?.length > 0) {
            dispatch(
               deletePublicPhotos({ photos: toDelete, token: user.token })
            );
         }
         return setSelect(false);
      }
      setSelect(true);
   };
   const addToDelete = (photo) => {
      setToDelete((previousValue) => [...previousValue, photo]);
   };
   const removeToDelte = (photo) => {
      const newArr = toDelete.filter((item) => item !== photo);
      setToDelete(newArr);
   };
   const onCancelHandler = () => {
      setToDelete([]);
      setSelect(false);
   };
   const onAddImagesHandler = (e) => {
      e.stopPropagation();
      const data = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
         data.append('images', e.target.files[i]);
      }
      dispatch(addPublicPhotos({ data, token: user.token }));
   };

   return (
      <div>
         {publicPhotos?.rows?.length < 1 ? (
            <AttentionMessage title={`Upload more photos to attract people.`}>
               <p>
                  Please be aware all public photos is visible to supporters.
               </p>
               <p>
                  Urcups is not reponsible for any use of your public photos.
               </p>
               <p>Be aware to people have no photos.</p>
            </AttentionMessage>
         ) : null}
         {isPublicPhotosLoading ? <Loader>Loading photos...</Loader> : null}
         {isPublicPhotosError ? (
            <AttentionMessage title='Only for sponsored users!'>
               <p>Sorry this page only availble for sponsored users.</p>
               <p>This site wouldn't run without your support.</p>
               <p>We thank you for your amazing support.</p>
            </AttentionMessage>
         ) : null}
         {publicPhotos?.rows?.length > 0 ? (
            <PhotoLayout
               select={select}
               images={publicPhotos?.rows}
               pages={pages}
               toDelete={toDelete}
               addToDelete={addToDelete}
               onSaveHandler={onSaveHandler}
               onCancelHandler={onCancelHandler}
               removeToDelte={removeToDelte}
               onAddImages={onAddImagesHandler}
            />
         ) : null}
         {/* <>
            {check(user, profile) ? (
               <AttentionMessage title='Suggestion for successful stories!'>
                  <p>To attract user please upload some of your photos.</p>
                  <p>
                     Most users are attracted to profile who have few or more
                     photos.
                  </p>
                  <p>We thank you for your amazing support.</p>
                  <br />
                  <br />
                  <img
                     src='/urcups256.png'
                     alt='Urcups Logo'
                     className='w-[130px]'
                  />
                  <p>Urcups Team</p>
                  <p>& Gabriel - Urcups President</p>
               </AttentionMessage>
            ) : null}
         </> */}
      </div>
   );
};

export default ProfilePhotos;
