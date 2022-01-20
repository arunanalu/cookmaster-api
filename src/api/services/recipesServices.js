const { recipes } = require('../models/recipesModels');

const getRecipes = async () => {
  const result = await recipes();
  return result;
};

module.exports = { getRecipes };
