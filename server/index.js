require('dotenv').config()
const express = require('express')
const cors = require('cors')
const colors = require('colors')
const db = require('./models')
const path = require('path')
const { v4: uuid } = require('uuid')
const bcrypt = require('bcryptjs')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'users')))

app.get('/', (req, res) => {
   res.status(200).send('Urcups server is running...')
})

// @router routes
// @path /api
const {
   errorHandler,
   notFound,
} = require('./middlewares/middlewareErrorHandler')

const userRoutes = require('./routes/routeUsers')
const publicRoutes = require('./routes/routeAllUsers')
const photosRoutes = require('./routes/routePhotos')
const messageRoutes = require('./routes/routeMessages')
const favoriteRoutes = require('./routes/routeFavorites')
const storiesRoutes = require('./routes/routeStories')

app.use('/api/users', userRoutes)
app.use('/api/public', publicRoutes)
app.use('/api/photos', photosRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/stories', storiesRoutes)

app.use(errorHandler)
app.use(notFound)

db.user.hasOne(db.config, { foreignKey: 'user_id', onDelete: 'cascade' })
db.user.hasOne(db.access, { foreignKey: 'user_id', onDelete: 'cascade' })
db.user.hasOne(db.info, { foreignKey: 'user_id', onDelete: 'cascade' })
db.user.hasMany(db.address, { foreignKey: 'user_id', onDelete: 'cascade' })
db.user.hasMany(db.favorite, { foreignKey: 'user_id', onDelete: 'cascade' })
db.user.hasMany(db.message, { foreignKey: 'user_id', onDelete: 'cascade' })
db.user.hasMany(db.payment, { foreignKey: 'user_id', onDelete: 'cascade' })
db.user.hasMany(db.photo, { foreignKey: 'user_id', onDelete: 'cascade' })
db.user.hasMany(db.view, { foreignKey: 'user_id', onDelete: 'cascade' })
db.user.hasMany(db.room, { foreignKey: 'user_id', onDelete: 'cascade' })
db.info.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' })
db.config.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' })
db.favorite.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' })
db.room.hasMany(db.message, { foreignKey: 'roomId', onDelete: 'cascade' })
db.story.hasMany(db.love, { foreignKey: 'story_id', onDelete: 'cascade' })
db.story.hasMany(db.comment, { foreignKey: 'story_id', onDelete: 'cascade' })
db.message.belongsTo(db.room, { foreignKey: 'roomId', onDelete: 'cascade' })
db.message.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' })
db.address.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' })
db.access.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' })
db.payment.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' })
db.photo.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' })

const PORT = process.env.PORT || 8000

// const server = app.listen(PORT, async () => {
//    console.log(`Server running on http://localhost:${PORT}`.yellow.bold.inverse)
// })

db.sequelize.sync().then(() =>
   app.listen(PORT, async () => {
      console.log(
         `Server running on http://10.0.0.50:${PORT}`.yellow.bold.inverse
      )
      const orientation = ['Straight', 'Gay', 'Bi', 'Lesbian', 'Transgender']
      // for (let i = 0; i < 100; i++) {
      //    let id = uuid()
      //    let randomValue = Math.floor(Math.random() * 2 + 1)
      //    await db.user.create({
      //       id,
      //       username: `user${i}`,
      //       avatar: '/avatar.jpg',
      //       thumbnail: '/avatar.jpg',
      //       wallpaper: '/wallpaper.jpg',
      //       age: i,
      //       sex: Math.floor(Math.random() * 2 + 1) === 1 ? 'Male' : 'Female',
      //       sexualOrientation: orientation[Math.floor(Math.random() * 5)],
      //       hugot: 'Wake me up when september ends!',
      //       dateOfBirth: '1983-08-23',
      //       city: 'Saratoga Springs',
      //       stateProvince: 'Utah',
      //       country: 'USA',
      //       isOnline: Math.floor(Math.random() * 2 + 1) === 1 ? true : false,
      //       password: 'R@mlec28',
      //       confirmPassword: 'R@mlec28',
      //    })
      //    await db.config.create({
      //       password: bcrypt.hashSync('R@mlec28', 10),
      //       email: `gabriel${i}@gmail.com`,
      //       isActivated: true,
      //       user_id: id,
      //    })
      //    await db.info.create({
      //       user_id: id,
      //    })
      //    await db.access.create({
      //       granted: randomValue === 1 ? 'paid' : 'free',
      //       membership: randomValue === 1 ? 'a' : 'f',
      //       user_id: id,
      //    })
      // }
   })
)
