const Router = require('express');
const { 
  getAllRecipes, 
  createNewRecipe, 
  getSingleRecipe, 
  editARecipe, 
  deleteARecipe } = require('../controllers/recipesControllers');
const auth = require('../middlewares/auth');
// const authWeak = require('../middlewares/authWeak');

const recipesRoutes = new Router();

recipesRoutes.get('/recipes', getAllRecipes);
recipesRoutes.get('/recipes/:id', getSingleRecipe);
recipesRoutes.post('/recipes', auth, createNewRecipe);
recipesRoutes.put('/recipes/:id', auth, editARecipe);
recipesRoutes.delete('/recipes/:id', auth, deleteARecipe);

module.exports = recipesRoutes;
