const { v4: uuid } = require('uuid')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const db = require('../models')
const Op = require('sequelize').Op
const { makeToken } = require('../utils/middlewareJwt')
const { sendEmail } = require('../utils/nodemailer')
const { imageResize } = require('../utils/middlewareSharp')

module.exports.controllerUpdateUserInfo = asyncHandler(async (req, res) => {
   const {
      isOnline,
      sex,
      city,
      stateProvince,
      country,
      hugot,
      maritalStatus,
      sexualOrientation,
      children,
      lookingFor,
      height,
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
      idealPartner,
      about,
   } = req.body
   await db.user.update(
      { isOnline, sex, hugot, sexualOrientation, city, stateProvince, country },
      { where: { id: req.user.id } }
   )
   await db.info.update(
      {
         maritalStatus,
         children,
         lookingFor,
         height,
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
         idealPartner,
         about,
      },
      {
         where: { user_id: req.user.id },
      }
   )
   const user = await db.user.findOne({
      where: { id: req.user.id },
      include: [db.info],
   })
   res.status(200).json({
      ...user.dataValues,
      ...user.dataValues.info.dataValues,
      id: req.user.id,
      info: null,
      token: makeToken(user.id),
   })
})
// @ USER UPDATE WALLPAPER
// @ PRIVATE
// @ POST
module.exports.controllerUpdateWallpaper = asyncHandler(async (req, res) => {
   const fileName = uuid()
   const album = 'wallpaper'
   const path = req.file.path

   await imageResize({
      path,
      width: null,
      height: 800,
      quality: 100,
      album: 'wallpaper',
      location: `./users/${req.user.id}/wallpaper/${fileName}.jpg`,
      user_id: req.user.id,
   })
   await db.user.update(
      {
         wallpaper: `/images/${req.user.id}/${album}/${fileName}.jpg`,
      },
      { where: { id: req.user.id } }
   )
   await imageResize({
      path,
      width: null,
      height: 800,
      quality: 100,
      album: 'public',
      location: `./users/${req.user.id}/public/${fileName}.jpg`,
      user_id: req.user.id,
   })
   await db.photo.create({
      user_id: req.user.id,
      fileName: `/images/${req.user.id}/public/${fileName}.jpg`,
      isPrivate: false,
      album: 'public',
   })
   fs.unlinkSync(path)

   const user = await db.user.findOne({
      where: { id: req.user.id },
   })
   res.status(201).json({ ...user.dataValues, token: makeToken(user.id) })
})
// @ USER UPDATE AVATAR
// @ PRIVATE
// @ POST
module.exports.controllerUpdateAvatar = asyncHandler(async (req, res) => {
   const fileName = uuid()
   const album = 'avatar'
   const path = req.file.path
   const location = `./users/${req.user.id}/${album}/${fileName}.jpg`
   await imageResize({
      path,
      width: 250,
      height: 250,
      quality: 100,
      album,
      location,
      user_id: req.user.id,
   })
   await db.user.update(
      {
         avatar: `/images/${req.user.id}/${album}/${fileName}.jpg`,
      },
      { where: { id: req.user.id } }
   )
   await imageResize({
      path,
      width: 100,
      height: 100,
      quality: 100,
      album: 'thumbnail',
      location: `./users/${req.user.id}/thumbnail/${fileName}.jpg`,
      user_id: req.user.id,
   })
   await imageResize({
      path,
      width: null,
      height: 800,
      quality: 100,
      album: 'public',
      location: `./users/${req.user.id}/public/${fileName}.jpg`,
      user_id: req.user.id,
   })
   await db.photo.create({
      user_id: req.user.id,
      fileName: `/images/${req.user.id}/public/${fileName}.jpg`,
      isPrivate: false,
      album: 'public',
   })
   await db.user.update(
      {
         thumbnail: `/images/${req.user.id}/thumbnail/${fileName}.jpg`,
      },
      { where: { id: req.user.id } }
   )
   fs.unlinkSync(path)

   const user = await db.user.findOne({
      where: { id: req.user.id },
   })
   res.status(201).json({ ...user.dataValues, token: makeToken(user.id) })
})

// @ USER LOGOUT
// @ PRIVATE
// @ POST
module.exports.controllerLogoutUser = asyncHandler(async (req, res) => {
   const user = await db.user.update(
      { isOnline: false },
      { where: { id: req.body.id } }
   )
   res.send(user)
})

// @ USER GET ALL USERS
// @ PUBLIC
// @ GET
module.exports.controllerGetAllUser = asyncHandler(async (req, res) => {
   const users = await db.user.findAll()
   res.send(users)
})
// @ USER GET SINGLE USER
// @ Private
// @ GET
module.exports.controllerGetUserWithId = asyncHandler(async (req, res) => {
   const id = req.params.id
   const room = await db.room.findOne({
      where: {
         [Op.or]: [
            { receiver: req.user.id, sender: req.params.id },
            { receiver: req.params.id, sender: req.user.id },
         ],
      },
   })
   const user = await db.user.findOne({
      where: { id },
   })
   if (!room) {
      return res.json({ ...user.dataValues, roomId: '' })
   }
   if (room && user) {
      return res.json({ ...user.dataValues, roomId: room.id })
   }
   throw new Error(
      'Profile not not exist, go back home and select a valid user.'
   )
})
// @ USER GET SINGLE USER
// @ PUBLIC
// @ GET
module.exports.controllerGetSingleUser = asyncHandler(async (req, res) => {
   const username = req.params.username
   const user = await db.user.findOne({
      where: { username },
      include: [db.info],
   })
   if (user) {
      return res.send({
         ...user.dataValues,
         info: null,
         ...user.dataValues.info.dataValues,
         id: user.id,
      })
   }
   throw new Error(
      'Profile not not exist, go back home and select a valid user.'
   )
})
// @ USER VERIFICATION
// @ PUBLIC
// @ GET
module.exports.controllerVerifyUser = asyncHandler(async (req, res) => {
   const token = req.params.token
   const decode = jwt.verify(token, process.env.JWT_SECRET)
   await db.config.update(
      { isActivated: true },
      { where: { user_id: decode.id } }
   )
   const activated = await db.config.findOne({ where: { user_id: decode.id } })
   if (activated?.isActivated) {
      return res.send({ token: makeToken(decode.id) })
   }
   throw new Error('Server error try again later.')
})
// @ USER LOGIN
// @ PUBLIC
// @ POST
module.exports.controllerLoginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body
   const config = await db.config.findOne({ where: { email: email } })
   if (config?.isActivated) {
      const verifyPassword = bcrypt.compareSync(password, config.password)
      if (verifyPassword) {
         await db.user.update(
            { isOnline: true },
            { where: { id: config.user_id } }
         )
         const user = await db.user.findOne({
            where: { id: config.user_id },
            include: [db.info],
         })
         return res.send({
            ...user.dataValues,
            info: null,
            ...user.dataValues.info.dataValues,
            id: user.id,
            token: makeToken(user.id),
         })
      }
   } else {
      throw new Error(
         'User is not verified. Please verify your email to login.'
      )
   }
   throw new Error(`User email or password don't match.`)
})

// @ USER REGISTRATION
// @ PUBLIC
// @ POST
module.exports.controllerRegisterUser = asyncHandler(async (req, res) => {
   const id = uuid()
   const {
      username,
      email,
      dateOfBirth,
      sex,
      hugot,
      sexualOrientation,
      city,
      stateProvince,
      country,
      isOnline,
      password,
      confirmPassword,
   } = req.body
   if (
      !Boolean(username.trim()) ||
      !Boolean(email.trim()) ||
      !Boolean(dateOfBirth.trim()) ||
      !Boolean(sex.trim()) ||
      !Boolean(hugot.trim()) ||
      !Boolean(sexualOrientation.trim()) ||
      !Boolean(password.trim()) ||
      !Boolean(confirmPassword.trim()) ||
      !Boolean(city.trim()) ||
      !Boolean(stateProvince.trim()) ||
      !Boolean(country.trim())
   )
      throw new Error('All fields are required.')
   if (password !== confirmPassword)
      throw new Error(`Password don't match try again.`)
   const checkUserName = await db.user.findOne({ where: { username } })
   if (checkUserName) throw new Error('User username already exist')
   const checkEmail = await db.config.findOne({ where: { email } })
   if (checkEmail) throw new Error('User email already exist')
   // CREATE USER
   const user = await db.user.create({
      id,
      username,
      age: `${
         Number(new Date().getFullYear()) - Number(dateOfBirth.split('-')[0])
      }`,
      dateOfBirth,
      sex,
      hugot,
      sexualOrientation,
      thumbnail: `/avatar.jpg`,
      avatar: `/avatar.jpg`,
      wallpaper: `/wallpaper.jpg`,
      city,
      stateProvince: stateProvince,
      country,
      isOnline,
   })
   // CREATE USER CONFIG
   const createConfig = await db.config.create({
      password: bcrypt.hashSync(password, 10),
      email: email,
      user_id: user.id,
   })
   // CREATE USER INFO
   await db.info.create({
      user_id: user.id,
      height: '/',
      idealPartner: '<br>',
      about: '<br>',
   })

   // Create a user folder
   // Link to users_id
   let dir = `./users/${user.id}`
   if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
   }

   sendEmail(
      createConfig.email,
      `Hi ${user.username} please verify your email to login.`,
      `<a href="${process.env.WEB_HOST}/auth/verify/${makeToken(
         user.id
      )}">Click here to veirify. </a> <p>${
         process.env.WEB_HOST
      }/auth/verify/${makeToken(user.id)}</p>`
   )

   res.send({ token: makeToken(user.id) })
})
