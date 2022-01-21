const { getRecipes, createRecipe, getRecipe } = require('../services/recipesServices');
const { success, created } = require('../utils/dictionary/statusCode');

const getAllRecipes = async (_req, res, next) => {
  try {
    const result = await getRecipes();
    res.status(success).json(result);
  } catch (error) {
    next(error);
  }
};

const createNewRecipe = async (req, res, next) => {
  try {
    const result = await createRecipe(req);
    res.status(created).json({ recipe: result });
  } catch (error) {
    next(error);
  }
};

const getSingleRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getRecipe(id);
    res.status(success).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllRecipes, createNewRecipe, getSingleRecipe };
