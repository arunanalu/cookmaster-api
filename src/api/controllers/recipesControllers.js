const { getRecipes } = require('../services/recipesServices');
const { success } = require('../utils/dictionary/statusCode');

const getAllRecipes = async (_req, res, next) => {
  try {
    const result = await getRecipes();
    res.status(success).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllRecipes };
