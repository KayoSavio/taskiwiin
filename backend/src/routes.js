const express = require('express');
const routes = express.Router();

const newUser = require('./controllers/newUser');
const newTask = require('./controllers/newTask');

routes.get('/task',async (req,res) => {
  //const tasks = await 
});

routes.get('/', (req,res) => {
  res.send('Home');
});
routes.post('/newuser', newUser.create);

routes.post('/tasks', newTask.create);
routes.get('/tasks', newTask.list);
routes.get('/tasks/:id', newTask.listItem);
routes.delete('/tasks/:id', newTask.delete);
routes.put('/tasks/:id', newTask.update);

module.exports = routes;
