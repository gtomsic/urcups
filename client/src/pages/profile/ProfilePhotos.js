import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { selectProfile } from '../../store/features/profile/profileSlice'
import {
   getPublicPhotos,
   resetPhotos,
   selectPublicPhotos,
} from '../../store/features/publicPhotos/publicPhotosSlice'
import { selectUser } from '../../store/features/user/userSlice'
import AttentionMessage from '../../components/AttentionMessage'
import PhotoLayout from '../../components/photos/PhotoLayout'

const ProfilePhotos = () => {
   const isFetch = useRef(false)
   const { user } = useSelector(selectUser)
   const { profile } = useSelector(selectProfile)
   const dispatch = useDispatch()
   const params = useParams()
   const {
      publicPhotos,
      isPublicPhotosLoading,
      isPublicPhotosSuccess,
      isPublicPhotosMessage,
      isPublicPhotosError,
   } = useSelector(selectPublicPhotos)
   useEffect(() => {
      if (isFetch.current === false) {
         dispatch(getPublicPhotos({ user_id: profile?.id, token: user?.token }))
      }

      return () => {
         isFetch.current = true
         dispatch(resetPhotos())
      }
   }, [dispatch, isFetch])

   return (
      <div>
         {isPublicPhotosLoading ? <Loader>Checking photos...</Loader> : null}
         {isPublicPhotosError ? (
            <AttentionMessage title='Only for sponsored users!'>
               {isPublicPhotosMessage}
            </AttentionMessage>
         ) : null}
         {publicPhotos.length > 0 ? (
            <PhotoLayout images={publicPhotos} />
         ) : null}
      </div>
   )
}

export default ProfilePhotos
