const Router = require('express');
const { 
  getAllRecipes, 
  createNewRecipe, 
  getSingleRecipe, 
  editARecipe, 
  deleteARecipe, 
  addAImage } = require('../controllers/recipesControllers');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer');

const recipesRoutes = new Router();

recipesRoutes.get('/recipes', getAllRecipes);
recipesRoutes.get('/recipes/:id', getSingleRecipe);
recipesRoutes.post('/recipes', auth, createNewRecipe);
recipesRoutes.put('/recipes/:id', auth, editARecipe);
recipesRoutes.delete('/recipes/:id', auth, deleteARecipe);
recipesRoutes.put('/recipes/:id/image', auth, upload, addAImage);

module.exports = recipesRoutes;
