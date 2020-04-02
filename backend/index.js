const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./src/routes');
const port = 3333;

app.use(express.json());
app.use(routes);
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/Taskiwiin',
{ useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false},
  (err) => {
    if (err){
      console.log(err);
    } console.log('Conectado ao DataBase');
});

app.listen(port,(err) => {
  if(err){
    console.log(err);
  }else{
    console.clear();
    console.log(`Server rodando em https://localhost:${port}`);
  }
})