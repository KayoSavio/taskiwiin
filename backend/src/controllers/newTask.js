const task = require('../models/task');

module.exports={
  async create(req,res){
    const {name} = req.body;
    try{
      if(await task.findOne({name}))
      return res.send({error:'Tarefa Existente'});
      console.clear();
      console.log('Tarefa Adicionada');
      res.send(req.body);
      task.create(req.body);
    }catch(err){
      return res.status(400).send({error:'registration Failed'});
    }
  },
  async list(req,res){
    const tasks = await task.find();
    return res.send(tasks);
  },
  async delete(req,res){
    await task.findOneAndDelete(req.params.id);
    return res.send('Deletado');
  },
  async update(req,res){
    const newtask = await task.findByIdAndUpdate(req.params.id, req.body, {new:true});
    return res.json(newtask);
  },
  async listItem(req,res){
    const taskiwiin = await task.findById(req.params.id);
    return res.json(taskiwiin);
  }
}