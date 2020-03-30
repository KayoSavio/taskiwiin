const express = require('express');
const routes = express.Router();

routes.get('/task',(req,res) => {
  res.send('Nova Tarefa');
});

routes.use('/', (req,res) => {
  res.send('Home');
});

module.exports = routes;
