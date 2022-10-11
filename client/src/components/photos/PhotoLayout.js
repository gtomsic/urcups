import React, { useState } from 'react'
import { useSelector } from 'react-redux'
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
   const onClickHander = (e, index) => {
      e.stopPropagation()
      setPhotoIndex(index)
      setIsOpen(true)
   }
   return (
      <>
         <div className='sticky top-[50px] z-20 w-full p-5 flex justify-between'>
            {/* EDIT AND SAVE HERE */}
            <PreviousNext pages={pages} />
            <EditSaveAdd
               select={select}
               cancel={onCancelHandler}
               onSave={onSaveHandler}
               onAddImages={onAddImages}
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
