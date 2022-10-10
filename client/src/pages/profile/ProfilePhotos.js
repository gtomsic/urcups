import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import { selectProfile } from '../../store/features/profile/profileSlice'
import {
   deletePublicPhotos,
   getPublicPhotos,
   selectPublicPhotos,
} from '../../store/features/publicPhotos/publicPhotosSlice'
import { selectUser } from '../../store/features/user/userSlice'
import AttentionMessage from '../../components/AttentionMessage'
import PhotoLayout from '../../components/photos/PhotoLayout'

const ProfilePhotos = () => {
   const [pages, setPages] = useState(null)
   const [select, setSelect] = useState(false)
   const [toDelete, setToDelete] = useState([])
   const { user } = useSelector(selectUser)
   const { profile } = useSelector(selectProfile)
   const dispatch = useDispatch()
   const {
      publicPhotos,
      isPublicPhotosLoading,
      isPublicPhotosMessage,
      isPublicPhotosError,
      publicPhotosOffset,
      publicPhotosLimit,
   } = useSelector(selectPublicPhotos)
   useEffect(() => {
      dispatch(
         getPublicPhotos({
            user_id: profile?.id,
            token: user?.token,
            offset: publicPhotosOffset,
            limit: publicPhotosLimit,
         })
      )
   }, [
      dispatch,
      publicPhotosOffset,
      publicPhotosLimit,
      profile?.id,
      user?.token,
   ])

   useEffect(() => {
      if (publicPhotos?.count) {
         const num = Math.ceil(publicPhotos?.count / publicPhotosLimit)
         setPages(num)
      }
   }, [publicPhotos?.count])

   const onSaveHandler = () => {
      if (select) {
         dispatch(deletePublicPhotos({ photos: toDelete, token: user.token }))
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

   return (
      <div>
         {isPublicPhotosLoading ? <Loader>Checking photos...</Loader> : null}
         {isPublicPhotosError ? (
            <AttentionMessage title='Only for sponsored users!'>
               {isPublicPhotosMessage}
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
            />
         ) : null}
      </div>
   )
}

export default ProfilePhotos
