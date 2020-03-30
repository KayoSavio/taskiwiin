const express = require('express');
const app = express();
const routes = require('./src/routes');
const port = 4000;

app.use(routes);

app.listen(port,(err) => {
  if(err){
    console.log(err);
  }else{
    console.clear();
    console.log(`Server rodando em https://localhost:${port}`);
  }
})