const { users } = require('../models/usersModels');

const getUsers = async () => {
  const result = await users();
  return result;
};

module.exports = { getUsers };
