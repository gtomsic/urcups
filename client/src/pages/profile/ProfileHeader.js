import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { MdPhotoSizeSelectActual } from 'react-icons/md'
import { FaUserAlt, FaCamera, FaLock } from 'react-icons/fa'
import { IoSettingsSharp, IoReader } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import {
   selectUser,
   updateAvatar,
   updateWallpaper,
} from '../../store/features/user/userSlice'
import Loader from '../../components/loader/Loader'
import ImageViewer from '../../components/photos/ImageViewer'
import Modal from '../../components/Modal'
import { check } from '../../utils/check'
import { selectPublicPhotos } from '../../store/features/publicPhotos/publicPhotosSlice'
import { selectPrivatePhotos } from '../../store/features/privatePhotos/privatePhotosSlice'
import MessageMenuHandler from '../../components/profile/MessageMenuHandler'
import {
   addRemoveFavorites,
   checkIsFavorite,
   selectFavorite,
} from '../../store/features/favorites/favoritesSlice'
import { actionBells } from '../../store/features/bells/bellsSlice'
const ProfileHeader = ({ profile }) => {
   const isFetch = useRef(false)
   const location = useLocation()
   const url = useSelector((state) => state.url)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isOpen, setIsOpen] = useState(false)
   const [images, setImages] = useState([])
   const [avatar, setAvatar] = useState(profile?.avatar)
   const [wallpaper, setWallpaper] = useState(profile?.wallpaper)
   const { user } = useSelector(selectUser)
   const { loadingAvatar, loadingWallpaper } = useSelector(selectUser)
   const { publicPhotos } = useSelector(selectPublicPhotos)
   const { privatePhotos } = useSelector(selectPrivatePhotos)
   const { favorite } = useSelector(selectFavorite)

   useEffect(() => {
      if (isFetch.current === false) {
         if (user?.id && user?.id !== profile?.id) {
            const data = {
               token: user?.token,
               profileId: profile?.id,
            }
            dispatch(checkIsFavorite(data))
         }
      }
      return () => {
         isFetch.current = true
      }
   }, [profile])

   const addRemoveFavoritesHandler = async (e) => {
      e.stopPropagation()
      e.preventDefault()
      await dispatch(
         addRemoveFavorites({
            token: user?.token,
            profileId: profile?.id,
         })
      )
      if (!favorite) {
         dispatch(
            actionBells({
               title: 'added you as favorite.',
               link: location.pathname,
               user_id: profile?.id,
               body: user?.username + ' added you as favorite.',
               token: user?.token,
            })
         )
      }
      navigate('/favorites')
   }

   const onAvatarChange = (e) => {
      e.preventDefault()
      e.stopPropagation()
      const data = new FormData()
      data.append('avatar', e.target.files[0])
      setAvatar(URL.createObjectURL(e.target.files[0]))
      dispatch(updateAvatar({ data: data, token: user.token }))
   }
   const onWallpaperChange = (e) => {
      e.preventDefault()
      e.stopPropagation()
      const data = new FormData()
      data.append('wallpaper', e.target.files[0])
      setWallpaper(URL.createObjectURL(e.target.files[0]))
      dispatch(updateWallpaper({ data: data, token: user.token }))
   }
   const viewProfilePhotoHandler = (e) => {
      e.stopPropagation()
      const isInclude = profile.avatar.includes('/avatar.jpg')
      if (isInclude) return
      const newLink = profile.avatar.replace('avatar', 'public')
      setImages([`${url + newLink}`])
      setIsOpen(true)
   }
   const viewProfileWallpaper = (e) => {
      e.stopPropagation()
      const isInclude = profile.wallpaper.includes('/wallpaper.jpg')
      if (isInclude) return
      const newLink = profile.wallpaper.replace('wallpaper', 'public')
      setImages([`${url + newLink}`])
      setIsOpen(true)
   }
   const stopPropagationHandler = (e) => {
      e.stopPropagation()
   }
   return (
      <>
         <div
            onClick={viewProfileWallpaper}
            style={{
               backgroundImage: `url(${url + wallpaper})`,
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
            }}
            className='h-[380px] group relative lg:rounded-t-2xl mb-[100px]'
         >
            {location.pathname !== `/profile/${user?.username}/edit` ? null : (
               <>
                  <div
                     onClick={stopPropagationHandler}
                     className='absolute text-3xl w-full h-full flex justify-end pr-8 pt-8 opacity-60 bg-gradient-to-bl bg-primary group-hover:opacity-95 group-hover:bg-gradient-to-bl from-secondary group-hover:bg-primary duration-300 lg:rounded-t-2xl'
                  >
                     {loadingWallpaper ? (
                        <div className='inline-block'>
                           <Loader />
                        </div>
                     ) : (
                        <FaCamera />
                     )}
                  </div>
                  <input
                     onClick={stopPropagationHandler}
                     onChange={onWallpaperChange}
                     type='file'
                     name='image'
                     accept='.png, .jpg, .JPEG'
                     className='h-full absolute w-full overflow-hidden cursor-pointer'
                  />
               </>
            )}

            {/* Profile Description */}
            <div className='absolute grid grid-cols-1 h-[250px] w-full bottom-0 bg-gradient-to-t from-primary'>
               <div className='absolute flex flex-row gap-11 px-0 md:px-11 bottom-[-100px] w-full'>
                  {/* Avatar */}

                  {location.pathname !== `/profile/${user?.username}/edit` ? (
                     <div
                        onClick={viewProfilePhotoHandler}
                        style={{
                           backgroundImage: `url(${url + avatar})`,
                           backgroundRepeat: 'no-repeat',
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                        }}
                        className='absolute lg:relative left-[50%] lg:left-0 translate-x-[-50%] lg:translate-x-0 top-[-210px] lg:top-0  w-[200px] h-[200px] aspect-square rounded-full border-4 border-white cursor-pointer'
                     >
                        {profile.isOnline ? (
                           <>
                              <span className='z-10 absolute bottom-3 right-5 w-6 aspect-square border-4 xl:w-6 xl:h-6 border-white rounded-full bg-secondary'></span>
                              <span className='z-0 animate-ping absolute bottom-3 right-5 w-6 aspect-square xl:w-6 xl:h-6 inline-flex rounded-full bg-white opacity-95'></span>
                           </>
                        ) : null}
                     </div>
                  ) : (
                     // For Editing View
                     <div
                        onClick={stopPropagationHandler}
                        className='absolute group lg:relative left-[50%] lg:left-0 translate-x-[-50%] lg:translate-x-0 top-[-210px] lg:top-0  w-[200px] h-[200px] aspect-square rounded-full border-4 border-white '
                        style={{
                           backgroundImage: `url(${url + avatar})`,
                           backgroundRepeat: 'no-repeat',
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                        }}
                     >
                        <div className='absolute text-3xl w-full h-full rounded-full flex justify-center items-center opacity-60 bg-gradient-to-bl bg-primary group-hover:opacity-95 group-hover:bg-gradient-to-bl from-secondary group-hover:bg-primary duration-300'>
                           {loadingAvatar ? <Loader /> : <FaCamera />}
                        </div>
                        <input
                           onChange={onAvatarChange}
                           type='file'
                           name='image'
                           accept='.png, .jpg, .JPEG'
                           className='h-full absolute w-full overflow-hidden cursor-pointer rounded-full'
                        />
                     </div>
                  )}

                  {/* Profile Info */}
                  <div className='flex-1 flex flex-col text-white'>
                     <div className='flex-1 flex  flex-col justify-end pl-3 lg:pl-0 pb-3'>
                        <h3>
                           {profile.username} / {profile.age} /{' '}
                           {profile.sexualOrientation}
                        </h3>
                        <h5>
                           {`${profile.city}, ${profile.stateProvince}, ${profile.country}`}
                        </h5>
                        <h5>{profile.hugot}</h5>
                     </div>
                     {/* Profile Options */}
                     <div
                        onClick={stopPropagationHandler}
                        className='flex-1 flex justify-between gap-1 md:gap-3'
                     >
                        {check(user, profile) || !user?.id ? null : (
                           <MessageMenuHandler />
                        )}
                        <Link
                           className='flex-1'
                           to={`/profile/${profile.username}`}
                        >
                           <div
                              className={`w-full flex flex-col items-center justify-center h-[100px] bg-gradient-to-b from-primary rounded-b-3xl hover:bg-secondary duration-300 cursor-pointer ${
                                 `/profile/${profile.username}` ===
                                 location.pathname
                                    ? 'bg-secondary'
                                    : null
                              }`}
                           >
                              <span className='text-md md:text-lg'>
                                 <FaUserAlt />
                              </span>
                              <span className='text-xs md:text-sm lg:text-md'>
                                 Profile
                              </span>
                           </div>
                        </Link>
                        <Link
                           className='flex-1'
                           to={`/profile/${profile.username}/stories`}
                        >
                           <div
                              className={`w-full flex flex-col items-center justify-center h-[100px] bg-gradient-to-b from-primary rounded-b-3xl hover:bg-secondary duration-300 cursor-pointer ${
                                 `/profile/${profile.username}/stories` ===
                                 location.pathname
                                    ? 'bg-secondary'
                                    : null
                              }`}
                           >
                              <span className='text-md md:text-lg'>
                                 <IoReader />
                              </span>
                              <span className='text-xs md:text-sm lg:text-md'>
                                 Stories
                              </span>
                           </div>
                        </Link>
                        {/* Check if there user is login or not */}
                        {!user?.id ? null : (
                           <Link
                              className='flex-1'
                              to={`/profile/${profile.username}/photos`}
                           >
                              <div
                                 className={`w-full flex flex-col items-center justify-center h-[100px] bg-gradient-to-b from-primary rounded-b-3xl hover:bg-secondary duration-300 cursor-pointer ${
                                    `/profile/${profile.username}/photos` ===
                                    location.pathname
                                       ? 'bg-secondary'
                                       : null
                                 }`}
                              >
                                 <span className='text-md md:text-lg'>
                                    <MdPhotoSizeSelectActual />
                                 </span>
                                 <span className='text-xs md:text-sm lg:text-md'>
                                    {publicPhotos?.count
                                       ? publicPhotos?.count
                                       : null}{' '}
                                    Photos
                                 </span>
                              </div>
                           </Link>
                        )}
                        {check(user, profile) ? (
                           <>
                              <Link
                                 className='flex-1'
                                 to={`/profile/${profile.username}/private`}
                              >
                                 <div
                                    className={`w-full flex flex-col items-center justify-center h-[100px] bg-gradient-to-b from-primary rounded-b-3xl hover:bg-secondary duration-300 cursor-pointer ${
                                       `/profile/${profile.username}/private` ===
                                       location.pathname
                                          ? 'bg-secondary'
                                          : null
                                    }`}
                                 >
                                    <span className='text-md md:text-lg'>
                                       <FaLock />
                                    </span>
                                    <span className='text-xs md:text-sm lg:text-md'>
                                       {privatePhotos?.count
                                          ? privatePhotos?.count
                                          : null}{' '}
                                       Private
                                    </span>
                                 </div>
                              </Link>

                              <Link
                                 className='flex-1'
                                 to={`/profile/${profile.username}/settings`}
                              >
                                 <div
                                    className={`w-full flex flex-col items-center justify-center h-[100px] bg-gradient-to-b from-primary rounded-b-3xl hover:bg-secondary duration-300 cursor-pointer ${
                                       `/profile/${profile.username}/settings` ===
                                       location.pathname
                                          ? 'bg-secondary'
                                          : null
                                    }`}
                                 >
                                    <span className='text-md md:text-lg'>
                                       <IoSettingsSharp />
                                    </span>
                                    <span className='text-xs md:text-sm lg:text-md'>
                                       Settings
                                    </span>
                                 </div>
                              </Link>
                           </>
                        ) : null}
                     </div>
                  </div>
               </div>
            </div>
            {/* BOOKMARK PROFILE */}
            {user?.id === profile?.id || !user?.id ? null : (
               <div
                  onClick={addRemoveFavoritesHandler}
                  className={
                     !favorite
                        ? 'absolute top-0 bg-gradient-to-b from-dark lg:rounded-tl-2xl text-4xl pt-5 px-2 h-full cursor-pointer'
                        : 'absolute top-0 bg-gradient-to-b from-secondary lg:rounded-tl-2xl text-4xl pt-5 px-2 h-full cursor-pointer'
                  }
               >
                  <BsBookmarkStarFill />
               </div>
            )}
         </div>
         {!isOpen ? null : (
            <Modal onClose={() => setIsOpen(false)}>
               <ImageViewer
                  images={images}
                  index={0}
                  onClose={() => setIsOpen(false)}
               />
            </Modal>
         )}
      </>
   )
}

export default ProfileHeader
