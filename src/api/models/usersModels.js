const connection = require('./connectionMongo');

const users = async () => {
  const db = await connection();
  const result = await db.collection('users').find().toArray();
  return result;
};

const create = async (name, email, password) => {
  const db = await connection();
  const result = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  return result.ops[0];
};

const userByEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

module.exports = { users, create, userByEmail };
