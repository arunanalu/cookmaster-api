const connection = require('./connectionMongo');

const users = async () => {
  const db = await connection();
  const result = await db.collection('users').find().toArray();
  return result;
};

module.exports = { users };
