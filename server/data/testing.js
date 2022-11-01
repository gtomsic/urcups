// db.sequelize.sync().then(() =>
//    app.listen(PORT, async () => {
//       console.log(
//          `Server running on http://10.0.0.50:${PORT}`.yellow.bold.inverse
//       )
//       const orientation = ['Straight', 'Gay', 'Bi', 'Lesbian', 'Transgender']
//       for (let i = 0; i < 100; i++) {
//          let id = uuid()
//          let randomValue = Math.floor(Math.random() * 2 + 1)
//          await db.user.create({
//             id,
//             username: `user${i}`,
//             avatar: '/avatar.jpg',
//             thumbnail: '/avatar.jpg',
//             wallpaper: '/wallpaper.jpg',
//             age: i,
//             sex: Math.floor(Math.random() * 2 + 1) === 1 ? 'Male' : 'Female',
//             sexualOrientation: orientation[Math.floor(Math.random() * 5)],
//             hugot: 'Wake me up when september ends!',
//             dateOfBirth: '1983-08-23',
//             city: 'Saratoga Springs',
//             stateProvince: 'Utah',
//             country: 'USA',
//             isOnline: Math.floor(Math.random() * 2 + 1) === 1 ? true : false,
//             password: 'gabriel',
//             confirmPassword: 'gabriel',
//          })
//          await db.config.create({
//             password: bcrypt.hashSync('gabriel', 10),
//             email: `gabriel${i}@gmail.com`,
//             isActivated: true,
//             user_id: id,
//          })
//          await db.info.create({
//             user_id: id,
//          })
//          await db.access.create({
//             granted: randomValue === 1 ? 'paid' : 'free',
//             membership: randomValue === 1 ? 'a' : 'f',
//             user_id: id,
//          })
//       }
//    })
// )
