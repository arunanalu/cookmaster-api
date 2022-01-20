const Router = require('express');
const { getAllUsers } = require('../controllers/usersControllers');

const userRoutes = new Router();

userRoutes.get('/users', getAllUsers);

module.exports = { userRoutes };
