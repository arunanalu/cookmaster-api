const Router = require('express');
const { getAllRecipes, createNewRecipe } = require('../controllers/recipesControllers');
const auth = require('../middlewares/auth');
// const authWeak = require('../middlewares/authWeak');

const recipesRoutes = new Router();

recipesRoutes.get('/recipes', getAllRecipes);
recipesRoutes.post('/recipes', auth, createNewRecipe);

module.exports = recipesRoutes;
