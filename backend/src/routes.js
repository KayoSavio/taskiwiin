const express = require('express');
const routes = express.Router();

const newUser = require('./controllers/newUser');
const newTask = require('./controllers/newTask');
const newHistory = require('./controllers/newHistory');
const newPersona = require('./controllers/newPersona');
const newClaim = require('./controllers/newClaim');

routes.get('/task',async (req,res) => {
  //const tasks = await 
});

routes.get('/', (req,res) => {
  res.send('Home');
});
routes.post('/register', newUser.create);
routes.get('/register/:id', newUser.login);
routes.get('/register', newUser.index);
routes.get('/registers/:name', newUser.wait);
routes.get('/registers/:password', newUser.wait);
routes.put('/register/:id', newUser.update);

routes.post('/tasks', newTask.create);
routes.get('/tasks', newTask.list);
routes.get('/task/:id', newTask.search);
routes.get('/tasks/:taskId', newTask.listItem);
routes.delete('/tasks/:id', newTask.delete);
routes.put('/tasks/:id', newTask.update);

routes.post('/claim', newClaim.create);
routes.get('/claim/:id', newClaim.search);//procura por um unico item com um id especificado
routes.get('/clain/:claimId', newClaim.listItem);//procura por todos os itens que tem o valor especidicado
routes.delete('/claim/:id', newClaim.delete);
routes.put('/claim/:id', newClaim.update);

routes.post('/history', newHistory.create);
routes.get('/history', newHistory.find);
routes.get('/history/:taskId', newHistory.wait);

routes.post('/persona', newPersona.create);
routes.get('/persona/:id', newPersona.listItem);
routes.get('/persona', newPersona.list);
routes.put('/persona/:id', newPersona.update);

module.exports = routes;
