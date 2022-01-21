const Router = require('express');
const { getAllUsers, createNewUser, loginNewUser } = require('../controllers/usersControllers');

const userRoutes = new Router();

userRoutes.get('/users', getAllUsers);
userRoutes.post('/users', createNewUser);
userRoutes.post('/login', loginNewUser);

module.exports = { userRoutes };
