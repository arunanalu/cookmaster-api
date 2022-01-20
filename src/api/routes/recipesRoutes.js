const Router = require('express');
const { getAllRecipes } = require('../controllers/recipesControllers');

const recipesRoutes = new Router();

recipesRoutes.get('/recipes', getAllRecipes);

module.exports = recipesRoutes;
