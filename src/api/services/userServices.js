const Joi = require('joi');
const { users, create, userByEmail } = require('../models/usersModels');
const { badRequest, conflict, unauthorized } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorConstructor');
const { genToken } = require('./authService');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
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

const loginUser = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw errorConstructor(unauthorized, 'All fields must be filled');
  const shouldEmailExist = await userByEmail(email);
  if (!shouldEmailExist) throw errorConstructor(unauthorized, 'Incorrect username or password');
  if (shouldEmailExist.password !== password) {
    throw errorConstructor(unauthorized, 'Inorrect username or password'); 
  }
  const { password: _password, ...userWithoutPassword } = shouldEmailExist;
  const token = genToken(userWithoutPassword);
  return token;
};

module.exports = { getUsers, createUser, loginUser };
