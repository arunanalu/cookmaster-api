const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { recipes, create, recipe, edit } = require('../models/recipesModels');
const { badRequest, notFound, unauthorized } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorConstructor');

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const recipeValidation = (req) => {
  const { name, ingredients, preparation } = req.body;
  const { error } = recipeSchema.validate({ name, ingredients, preparation });
  if (error) throw errorConstructor(badRequest, 'Invalid entries. Try again.');
};

const roleValidation = async (role, id, userId) => {
  if (role !== 'admin') {
    const originalRecipe = await recipe(id);
    const { userId: originalRecipeUserId } = originalRecipe;
    if (originalRecipeUserId !== userId) { 
      throw errorConstructor(unauthorized, 'A receita não é sua'); 
    }
  }
};

const getRecipes = async () => {
  const result = await recipes();
  return result;
};

const createRecipe = async (req) => {
  // console.log(req.body);
  // console.log(req.user);
  recipeValidation(req);
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const result = await create(name, ingredients, preparation, userId);
  return result;
};

const getRecipe = async (id) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, 'recipe not found');
  const result = await recipe(id);
  return result;
};

const editRecipe = async (req) => {
  recipeValidation(req);
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { _id: userId, role } = req.user;
  if (!id) throw errorConstructor(badRequest, 'Invalid entries. Try again.');
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, 'recipe not found');

  await roleValidation(role, id, userId);

  await edit(name, ingredients, preparation, id);
  const result = {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };
  return result;
};

module.exports = { getRecipes, createRecipe, getRecipe, editRecipe };
