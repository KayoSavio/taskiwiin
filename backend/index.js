const express = require('express');
const app = express();

app.use('/',(req,res) => {
  res.send('Funcionando Server');
})

const port = 4000;

app.listen(port,(err) => {
  if(err){
    console.log(err);
  }else{
    console.clear();
    console.log(`Server rodando em https://localhost:${port}`);
  }
})