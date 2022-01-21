const { getUsers, createUser, loginUser } = require('../services/userServices');
const { success, created } = require('../utils/dictionary/statusCode');

const getAllUsers = async (_req, res, next) => {
  try {
    const result = await getUsers();
    res.status(success).json(result);
  } catch (error) {
    next(error);
  }
};

const createNewUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await createUser(name, email, password);
    res.status(created).json({ user: result });
  } catch (error) {
    next(error);
  }
};

const loginNewUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(success).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, createNewUser, loginNewUser };
