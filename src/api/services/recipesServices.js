const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { recipes, create, recipe } = require('../models/recipesModels');
const { badRequest, notFound } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorConstructor');

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const getRecipes = async () => {
  const result = await recipes();
  return result;
};

const createRecipe = async (req) => {
  // console.log(req.body);
  // console.log(req.user);
  const { name, ingredients, preparation } = req.body;
  const { error } = recipeSchema.validate({ name, ingredients, preparation });
  if (error) throw errorConstructor(badRequest, 'Invalid entries. Try again.');
  const { _id: userId } = req.user;
  const result = await create(name, ingredients, preparation, userId);
  return result;
};

const getRecipe = async (id) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, 'recipe not found');
  const result = await recipe(id);
  return result;
};

module.exports = { getRecipes, createRecipe, getRecipe };
