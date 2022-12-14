require('dotenv').config();
const express = require('express');
const cors = require('cors');
const colors = require('colors');
const db = require('./models');
const path = require('path');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'users')));

app.get('/', (req, res) => {
   res.status(200).send('Urcups server is running...');
});

// @router routes
// @path /api
const {
   errorHandler,
   notFound,
} = require('./middlewares/middlewareErrorHandler');

const userRoutes = require('./routes/routeUsers');
const publicRoutes = require('./routes/routeAllUsers');
const photosRoutes = require('./routes/routePhotos');
const messageRoutes = require('./routes/routeMessages');
const favoriteRoutes = require('./routes/routeFavorites');
const storiesRoutes = require('./routes/routeStories');
const loveRoutes = require('./routes/routeLoves');
const commentsRoutes = require('./routes/routeComments');
const bellsRoutes = require('./routes/routeBells');
const authRoutes = require('./routes/routeAuths');
const paymentRoutes = require('./routes/routePayment');
const settingsRoutes = require('./routes/routeSettings');

app.use('/api/users', userRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/photos', photosRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/loves', loveRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/bells', bellsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/settings', settingsRoutes);

app.use(errorHandler);
app.use(notFound);

db.user.hasOne(db.config, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.user.hasOne(db.access, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.user.hasOne(db.info, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.user.hasMany(db.address, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.user.hasMany(db.favorite, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.user.hasMany(db.message, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.user.hasMany(db.payment, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.user.hasMany(db.photo, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.user.hasMany(db.view, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.user.hasMany(db.room, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.config.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.info.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.favorite.belongsTo(db.user, {
   foreignKey: 'user_id',
   onDelete: 'NO ACTION',
});
db.room.hasMany(db.message, { foreignKey: 'roomId', onDelete: 'NO ACTION' });
db.story.hasMany(db.love, { foreignKey: 'story_id', onDelete: 'NO ACTION' });
db.story.hasMany(db.comment, { foreignKey: 'story_id', onDelete: 'NO ACTION' });
db.message.belongsTo(db.room, { foreignKey: 'roomId', onDelete: 'NO ACTION' });
db.message.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.address.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.access.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.payment.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
db.photo.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'NO ACTION' });

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, async () => {
   console.log(
      `Server running on http://localhost:${PORT}`.yellow.bold.inverse
   );
});

db.sequelize.sync().then(() => server);
