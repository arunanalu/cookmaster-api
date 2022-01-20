const Router = require('express');
const { getAllUsers, createNewUser } = require('../controllers/usersControllers');

const userRoutes = new Router();

userRoutes.get('/users', getAllUsers);
userRoutes.post('/users', createNewUser);

module.exports = { userRoutes };
