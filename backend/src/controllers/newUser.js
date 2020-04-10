const user = require('../models/user');

module.exports={
  async create (req, res){
    const {name, email, password} =req.body;
    try{
      if(await user.findOne({email}))
      return res.send({error:'Email já cadastrado!'});
      if(await user.findOne({name}))
      return res.send({error: 'Nome de usuário indisponível!'})
      user.create(req.body);
      res.send(req.body);
    }catch(err){
      return res.status(400).send({error:'registration Failed'});
    }
  },
  async login(req,res){
    try{
      const data = await user.findById(req.params.id);
      return res.json(data);
    }catch(err){
      return console.log(err);
    }
  },
  async index(req,res){
    const users = await user.find();
    return res.send(users);
  },
  async wait(req,res){
    const nome = req.params.name;
    await user.find({'name':nome},(err,item)=>{
      if(err){
        return handleError(err);
      }else{res.json(item);}
    });
  }
}
