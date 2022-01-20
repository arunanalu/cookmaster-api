const { getUsers } = require('../services/userServices');
const { success } = require('../utils/dictionary/statusCode');

const getAllUsers = async (_req, res, next) => {
  try {
    const result = await getUsers();
    res.status(success).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers };
