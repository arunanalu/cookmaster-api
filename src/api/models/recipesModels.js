const connection = require('./connectionMongo');

const recipes = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const result = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return result.ops[0];
};

module.exports = { recipes, create };
