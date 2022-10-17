import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../store/features/profile/profileSlice'
import { selectUser } from '../../store/features/user/userSlice'
import EditSaveAdd from '../EditSaveAdd'
import Modal from '../Modal'
import PreviousNext from '../PreviousNext'

import ImageItem from './ImageItem'
import ImageViewer from './ImageViewer'

import './photoLayout.css'
const PhotoLayout = ({
   images,
   pages,
   toDelete,
   select,
   onSaveHandler,
   addToDelete,
   removeToDelte,
   onCancelHandler,
   onAddImages,
}) => {
   const [isOpen, setIsOpen] = useState(false)
   const [photoIndex, setPhotoIndex] = useState(null)
   const url = useSelector((state) => state.url)
   const { user } = useSelector(selectUser)
   const { profile } = useSelector(selectProfile)
   const onClickHander = (e, index) => {
      e.stopPropagation()
      setPhotoIndex(index)
      setIsOpen(true)
   }
   return (
      <>
         <div
            className={
               user?.id !== profile?.id || !user?.id
                  ? `sticky mb-5 top-[70px] z-20 w-full px-3 flex justify-between overflow-hidden`
                  : `sticky z-20 mb-5 top-[80px] md:top-[110px] w-full px-3 flex justify-between overflow-hidden`
            }
         >
            {/* EDIT AND SAVE HERE */}
            {images?.length <= 0 ? <div></div> : <PreviousNext pages={pages} />}
            <EditSaveAdd
               select={select}
               cancel={onCancelHandler}
               onSave={onSaveHandler}
               onAddImages={onAddImages}
               images={images}
            />
         </div>
         <div className='image-list'>
            {images?.map((image, index) => {
               if (
                  user?.avatar?.replace('avatar', 'public') ===
                     image.fileName ||
                  user?.wallpaper?.replace('wallpaper', 'public') ===
                     image.fileName
               )
                  return null
               return (
                  <ImageItem
                     key={image.id}
                     image={url + image.fileName}
                     fileName={image.fileName}
                     onClick={(e) => onClickHander(e, index)}
                     select={select}
                     toDelete={toDelete}
                     onDelete={addToDelete}
                     onRemove={removeToDelte}
                  />
               )
            })}
         </div>
         {!isOpen ? null : (
            <Modal onClose={() => setIsOpen(false)}>
               <ImageViewer
                  images={images}
                  index={photoIndex}
                  onClose={() => setIsOpen(false)}
               />
            </Modal>
         )}
      </>
   )
}

export default PhotoLayout
