import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import { selectProfile } from '../../store/features/profile/profileSlice'
import {
   selectPrivatePhotos,
   getPrivatePhotos,
   resetPrivatePhotos,
   deletePrivatePhotos,
   addPrivatePhotos,
} from '../../store/features/privatePhotos/privatePhotosSlice'
import { selectUser } from '../../store/features/user/userSlice'
import AttentionMessage from '../../components/AttentionMessage'
import PhotoLayout from '../../components/photos/PhotoLayout'

const ProfilePrivatePhotos = () => {
   const isFetch = useRef(false)
   const [pages, setPages] = useState(null)
   const [select, setSelect] = useState(false)
   const [toDelete, setToDelete] = useState([])
   const { user } = useSelector(selectUser)
   const { profile } = useSelector(selectProfile)
   const dispatch = useDispatch()
   const {
      privatePhotos,
      privatePhotosLoading,
      privatePhotosError,
      privatePhotosOffset,
      privatePhotosLimit,
   } = useSelector(selectPrivatePhotos)
   useEffect(() => {
      dispatch(
         getPrivatePhotos({
            user_id: profile?.id,
            token: user?.token,
            offset: privatePhotosOffset,
            limit: privatePhotosLimit,
         })
      )
      return () => {
         isFetch.current = true
         dispatch(resetPrivatePhotos())
      }
   }, [
      dispatch,
      privatePhotosOffset,
      privatePhotosLimit,
      profile?.id,
      user?.token,
   ])

   useEffect(() => {
      if (privatePhotos?.count) {
         const num = Math.ceil(privatePhotos?.count / privatePhotosLimit)
         setPages(num)
      }
   }, [privatePhotos?.count, privatePhotosLimit])

   const onSaveHandler = () => {
      if (select) {
         if (toDelete?.length > 0) {
            dispatch(
               deletePrivatePhotos({ photos: toDelete, token: user.token })
            )
         }
         return setSelect(false)
      }
      setSelect(true)
   }
   const addToDelete = (photo) => {
      setToDelete((previousValue) => [...previousValue, photo])
   }
   const removeToDelte = (photo) => {
      const newArr = toDelete.filter((item) => item !== photo)
      setToDelete(newArr)
   }
   const onCancelHandler = () => {
      setToDelete([])
      setSelect(false)
   }
   const onAddImagesHandler = (e) => {
      e.stopPropagation()
      const data = new FormData()
      for (let i = 0; i < e.target.files.length; i++) {
         data.append('images', e.target.files[i])
      }
      dispatch(addPrivatePhotos({ data, token: user.token }))
   }

   return (
      <div>
         {privatePhotosLoading ? <Loader>Loading photos...</Loader> : null}
         {privatePhotosError ? (
            <AttentionMessage title='Only for sponsored users!'>
               <p>Sorry this page only availble for sponsored users.</p>
               <p>This site wouldn't run without your support.</p>
               <p>We thank you for your amazing support.</p>
            </AttentionMessage>
         ) : null}
         <PhotoLayout
            select={select}
            images={privatePhotos?.rows}
            pages={pages}
            toDelete={toDelete}
            addToDelete={addToDelete}
            onSaveHandler={onSaveHandler}
            onCancelHandler={onCancelHandler}
            removeToDelte={removeToDelte}
            onAddImages={onAddImagesHandler}
         />
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
   )
}

export default ProfilePrivatePhotos
