const express = require('express');
const error = require('./middlewares/errorMiddleware');
const recipesRoutes = require('./routes/recipesRoutes');
const { userRoutes } = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador.

app.use(recipesRoutes);
app.use(userRoutes);
app.use(error);

module.exports = app;
