const history = require('../models/history');

module.exports={
  async create(req,res){
    try{
      res.send(req.body);
      history.create(req.body);
    }catch(err){
      return res.status(400).send({error:'Task Error'});
    }
  },
  async find(req,res){
    const historys = await history.countDocuments();
    return res.json(historys);
  }
}