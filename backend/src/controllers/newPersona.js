const persona = require('../models/persona');

module.exports={
  async create(req,res){
    try{
      res.send(req.body);
      await persona.create(req.body);
    }catch(err){
      return res.status(400).send({error:'registration Failed'});
    }
  },
  async list(req,res){
    const personas = await persona.find();
    return res.send(personas);
  },
  async delete(req,res){
    await persona.findByIdAndDelete(req.params.id);
    return res.send('Deletado');
  },
  async update(req,res){
    const newpersona = await persona.findByIdAndUpdate(req.params.id, req.body, {new:true});
    return res.json(newpersona);
  },
  async listItem(req,res){
    const personaId = await persona.findById(req.params.id);
    return res.json(personaId);
  }
}