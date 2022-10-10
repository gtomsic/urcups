import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from '../Modal'

import ImageItem from './ImageItem'
import ImageViewer from './ImageViewer'

import './photoLayout.css'
const PhotoLayout = ({ images }) => {
   const url = useSelector((state) => state.url)
   const [isOpen, setIsOpen] = useState(false)
   const [photoIndex, setPhotoIndex] = useState(null)
   const onClickHander = (e, index) => {
      e.stopPropagation()
      setPhotoIndex(index)
      setIsOpen(true)
   }
   return (
      <>
         <div className='image-list'>
            {images.map((image, index) => (
               <ImageItem
                  key={image.id}
                  image={url + image.fileName}
                  fileName='image.filename'
                  onClick={(e) => onClickHander(e, index)}
               />
            ))}
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
