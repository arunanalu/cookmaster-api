const express = require('express');
const error = require('./middlewares/errorMiddleware');
const recipesRoutes = require('./routes/recipesRoutes');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador.

app.use(recipesRoutes);
app.use(error);

module.exports = app;
