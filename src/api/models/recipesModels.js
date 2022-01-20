const connection = require('./connectionMongo');

const recipes = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

module.exports = { recipes };
