const models = require('../models/user');

module.exports={
  async create (req, res){
    const {name, email, password} =req.body;
    try{
      if(await models.findOne({email}))
      return res.send({error:'Usuário já existe!'});
      console.clear();
      console.log('Usuário criado com sucesso!');
      res.send({name, password});
      models.create(req.body);
    }catch(err){
      return res.status(400).send({error:'registration Failed'});
    }
}
}
