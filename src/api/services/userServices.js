const Joi = require('joi');
const { users, create, userByEmail } = require('../models/usersModels');
const { badRequest, conflict } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorConstructor');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const getUsers = async () => {
  const result = await users();
  return result;
};

const createUser = async (name, email, password) => {
  const { error } = userSchema.validate({ name, email, password });
  if (error) throw errorConstructor(badRequest, 'Invalid entries. Try again.');

  const userAlreadyExist = await userByEmail(email);
  if (userAlreadyExist) throw errorConstructor(conflict, 'Email already registered');
  
  const result = await create(name, email, password);
  const { password: _password, ...userWithoutPassword } = result;
  return userWithoutPassword;
};

module.exports = { getUsers, createUser };
