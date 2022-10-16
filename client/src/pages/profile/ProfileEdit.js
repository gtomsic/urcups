import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/Card'
import TextInput from '../../components/forms/TextInput'
import SelectOptions from '../../components/forms/SelectOptions'
import { countries } from '../../data/countries'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import {
   selectProfile,
   updateProfileInfo,
} from '../../store/features/profile/profileSlice'
import { selectUser } from '../../store/features/user/userSlice'
import { isRightUser } from '../../utils/check'

const ProfileEdit = () => {
   const navigate = useNavigate()
   const params = useParams()
   const dispatch = useDispatch()
   const { profile } = useSelector(selectProfile)
   const { user } = useSelector(selectUser)
   const [username, setUserName] = useState(profile?.username || '')
   const [age, setAge] = useState(profile?.age || '')
   const [dateOfBirth, setDateOfBirth] = useState(profile?.dateOfBirth || '')
   const [sex, setSex] = useState(profile?.sex || '')
   const [city, setCity] = useState(profile?.city || '')
   const [stateProvince, setStateProvince] = useState(
      profile?.stateProvince || ''
   )
   const [country, setCountry] = useState(profile?.country || '')
   const [hugot, setHugot] = useState(profile?.hugot || '')
   const [maritalStatus, setMaritalStatus] = useState(
      profile?.maritalStatus || ''
   )
   const [sexualOrientation, setSexualOrientation] = useState(
      profile?.sexualOrientation || ''
   )
   const [children, setChildren] = useState(profile?.children || '')
   const [lookingFor, setLookingFor] = useState(profile?.lookingFor || '')
   const [foot, setFoot] = useState(
      profile?.height?.split("'")[0] ? profile.height.split("'")[0] + "'" : ''
   )
   const [inches, setInches] = useState(profile?.height?.split("'")[1] || '')
   const [race, setRace] = useState(profile?.race || '')
   const [bodyType, setBodyType] = useState(profile?.bodyType || '')
   const [education, setEducation] = useState(profile?.education || '')
   const [occupation, setOccupation] = useState(profile?.occupation || '')
   const [smoking, setSmoking] = useState(profile?.smoking || '')
   const [dringking, setDringking] = useState(profile?.dringking || '')
   const [language, setLanguage] = useState(profile?.language || '')
   const [astrology, setAstrology] = useState(profile?.astrology || '')
   const [hairColor, setHairColor] = useState(profile?.hairColor || '')
   const [eyeColor, setEyeColor] = useState(profile?.eyeColor || '')
   const [religion, setReligion] = useState(profile?.religion || '')
   const [hobbies, setHobbies] = useState(profile?.hobbies || '')
   const [idealPartner, setIdealPartner] = useState(
      profile?.idealPartner?.split('<br>').join('\n' || '')
   )
   const [about, setAbout] = useState(
      profile?.about?.split('<br>').join('\n') || ''
   )
   useEffect(() => {
      isRightUser(user, profile, navigate)
   }, [user, profile, navigate])
   useEffect(() => {
      if (!profile?.id) {
         navigate(`/profile/${params.username}`)
      }
   }, [profile, navigate, params.username])

   const onSaveHandler = async () => {
      // const newAbout = about.split('\n').join('<br>')
      const data = {
         isOnline: profile.isOnline,
         sex,
         city,
         stateProvince,
         country,
         hugot,
         maritalStatus,
         sexualOrientation,
         children,
         lookingFor,
         height: `${foot?.split("'")[0] ? foot : ''}${inches}`,
         race,
         bodyType,
         education,
         occupation,
         smoking,
         dringking,
         language,
         astrology,
         hairColor,
         eyeColor,
         religion,
         hobbies,
         idealPartner: idealPartner?.split('\n').join('<br>'),
         about: about?.split('\n').join('<br>'),
         token: user.token,
      }
      await dispatch(updateProfileInfo(data))
      navigate(`/profile/${user.username}`)
   }

   const onCancelHandler = () => {
      navigate(`/profile/${user.username}`)
   }

   return (
      <div className='flex flex-col gap-5 lg:gap-11'>
         <Card>
            <h4>User Data</h4>
            <div className='grid grid-cols-1 gap-0 lg:gap-5 lg:grid-cols-2'>
               <div>
                  <TextInput
                     value={username}
                     onChange={(e) => setUserName(e.target.value)}
                     label='Username'
                     title='Username'
                     disabled={true}
                     bg='text-white border border-white'
                  />

                  <TextInput
                     value={age}
                     onChange={(e) => setAge(e.target.value)}
                     label='Age'
                     title='Age'
                     disabled={true}
                     bg='text-white border border-white'
                  />
                  <TextInput
                     value={dateOfBirth}
                     onChange={(e) => setDateOfBirth(e.target.value)}
                     label='Date of Birth'
                     title='Date of Birth'
                     disabled={true}
                     bg='text-white border border-white'
                  />
                  <SelectOptions
                     value={sex}
                     onChange={(e) => setSex(e.target.value)}
                     label='Sex'
                     data={[{ name: 'Male' }, { name: 'Female' }]}
                  />
               </div>
               <div>
                  <TextInput
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     label='City'
                     title='City'
                     bg='text-dark bg-white'
                  />
                  <TextInput
                     value={stateProvince}
                     onChange={(e) => setStateProvince(e.target.value)}
                     label='State Province'
                     title='State Province'
                     bg='text-dark bg-white'
                  />
                  <SelectOptions
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                     label='Country'
                     data={countries}
                  />
               </div>
            </div>
         </Card>
         <Card>
            <h4>More Info</h4>

            <div className='grid grid-cols-1 gap-x-0 lg:gap-x-5 lg:grid-cols-2'>
               <div className='lg:col-span-2'>
                  <TextInput
                     value={hugot}
                     onChange={(e) => setHugot(e.target.value)}
                     label='Hugot'
                     title='Hugot'
                     bg='text-dark bg-white'
                  />
               </div>
               <SelectOptions
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  label='Marital Status'
                  data={[
                     { name: '-' },
                     { name: 'Single' },
                     { name: 'Married' },
                     { name: 'Widow' },
                     { name: 'Divorced' },
                     { name: 'Complicated' },
                  ]}
               />
               <SelectOptions
                  value={sexualOrientation}
                  onChange={(e) => setSexualOrientation(e.target.value)}
                  label='Sexual Orientation'
                  data={[
                     { name: '-' },
                     { name: 'Straight' },
                     { name: 'Gay' },
                     { name: 'Bi' },
                     { name: 'Lesbian' },
                     { name: 'Transgender' },
                  ]}
               />
               <SelectOptions
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                  label='Children'
                  data={[
                     { name: '-' },
                     { name: 'Yes' },
                     { name: 'No' },
                     { name: 'Someday' },
                  ]}
               />
               <SelectOptions
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  label='Looking For'
                  data={[
                     { name: '-' },
                     { name: 'Men' },
                     { name: 'Woman' },
                     { name: 'Men/Woman' },
                  ]}
               />
               <div className='grid grid-cols-2 gap-2'>
                  <SelectOptions
                     value={foot}
                     onChange={(e) => setFoot(e.target.value)}
                     label='Height Foot'
                     data={[
                        { name: '-' },
                        { name: `3'` },
                        { name: `4'` },
                        { name: `5'` },
                        { name: `6'` },
                        { name: `7'` },
                        { name: `8'` },
                     ]}
                  />
                  <SelectOptions
                     value={inches}
                     onChange={(e) => setInches(e.target.value)}
                     label='Height Inches'
                     data={[
                        { name: '-' },
                        { name: `1"` },
                        { name: `2"` },
                        { name: `3"` },
                        { name: `4"` },
                        { name: `5"` },
                        { name: `6"` },
                        { name: `7"` },
                        { name: `8"` },
                        { name: `9"` },
                        { name: `10"` },
                        { name: `11"` },
                     ]}
                  />
               </div>
               <TextInput
                  value={race}
                  onChange={(e) => setRace(e.target.value)}
                  label='Race'
                  title='Race'
                  bg='text-dark bg-white'
               />
               <SelectOptions
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                  label='Body Type'
                  data={[
                     { name: '-' },
                     { name: 'Slender' },
                     { name: 'Average' },
                     { name: 'Stocky' },
                     { name: 'Chubby' },
                  ]}
               />
               <SelectOptions
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  label='Education'
                  data={[
                     { name: '-' },
                     { name: 'Grade School' },
                     { name: 'High School' },
                     { name: 'College' },
                     { name: 'PhD' },
                  ]}
               />
               <TextInput
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  label='Occupation'
                  title='Occupation'
                  bg='text-dark bg-white'
               />
               <SelectOptions
                  value={smoking}
                  onChange={(e) => setSmoking(e.target.value)}
                  label='Smoking'
                  data={[
                     { name: '-' },
                     { name: 'Not' },
                     { name: 'Light' },
                     { name: 'Heavy' },
                  ]}
               />
               <SelectOptions
                  value={dringking}
                  onChange={(e) => setDringking(e.target.value)}
                  label='Dringking'
                  data={[
                     { name: '-' },
                     { name: 'Not' },
                     { name: 'Socially' },
                     { name: 'Alcoholic' },
                  ]}
               />
               <TextInput
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  label='Language'
                  title='Language'
                  bg='text-dark bg-white'
               />
               <TextInput
                  value={astrology}
                  onChange={(e) => setAstrology(e.target.value)}
                  label='Astrology'
                  title='Astrology'
                  bg='text-dark bg-white'
               />
               <TextInput
                  value={hairColor}
                  onChange={(e) => setHairColor(e.target.value)}
                  label='Hair Color'
                  title='Hair Color'
                  bg='text-dark bg-white'
               />
               <TextInput
                  value={eyeColor}
                  onChange={(e) => setEyeColor(e.target.value)}
                  label='Eye Color'
                  title='Eye Color'
                  bg='text-dark bg-white'
               />
               <TextInput
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  label='Religion'
                  title='Religion'
                  bg='text-dark bg-white'
               />
            </div>
         </Card>
         <Card>
            <h4>Hobbies</h4>

            <textarea
               value={hobbies}
               onChange={(e) => setHobbies(e.target.value)}
               name='hobbies'
               id='hobbies'
               rows='4'
               className='bg-white text-dark resize-none p-5'
               placeholder='All hobbies need to be separated by comma. Example(Technolgy, Movies, Travels etc....)'
            ></textarea>
         </Card>
         <Card>
            <h4>Ideal Partner</h4>

            <textarea
               value={idealPartner}
               onChange={(e) => setIdealPartner(e.target.value)}
               name='idealPartner'
               id='idealPartner'
               rows='6'
               className='bg-white text-dark resize-none p-5'
               placeholder='Write about your ideal partner.'
            ></textarea>
         </Card>
         <Card>
            <h4>About Me</h4>

            <textarea
               value={about}
               onChange={(e) => setAbout(e.target.value)}
               name='about'
               id='about'
               rows='10'
               className='bg-white text-dark resize-none p-5'
               placeholder='Write something about you.'
            ></textarea>
            <div className='grid grid-cols-1  lg:grid-cols-2 gap-5'>
               <Button
                  onClick={onCancelHandler}
                  color='bg-gradient-to-tr from-danger bg-primary hover:bg-warning'
               >
                  Cancel
               </Button>
               <Button
                  onClick={onSaveHandler}
                  color='bg-gradient-to-tr from-danger bg-primary hover:from-secondary'
               >
                  Save
               </Button>
            </div>
         </Card>
      </div>
   )
}

export default ProfileEdit
