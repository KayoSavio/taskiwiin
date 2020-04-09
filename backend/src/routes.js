const express = require('express');
const routes = express.Router();

const newUser = require('./controllers/newUser');
const newTask = require('./controllers/newTask');
const newHistory = require('./controllers/newHistory');
const newPersona = require('./controllers/newPersona');

routes.get('/task',async (req,res) => {
  //const tasks = await 
});

routes.get('/', (req,res) => {
  res.send('Home');
});
routes.post('/register', newUser.create);
routes.get('/register/:id', newUser.login);
routes.get('/register', newUser.index);

routes.post('/tasks', newTask.create);
routes.get('/tasks', newTask.list);
routes.get('/tasks/:user', newTask.listItem);
routes.delete('/tasks/:id', newTask.delete);
routes.put('/tasks/:id', newTask.update);

routes.post('/history', newHistory.create);
routes.get('/history', newHistory.find);

routes.post('/persona', newPersona.create);
routes.get('/persona/:id', newPersona.listItem);
routes.get('/persona', newPersona.list);
routes.get('/persona/:id', newPersona.update);

module.exports = routes;
