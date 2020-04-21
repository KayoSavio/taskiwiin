const claim = require('../models/claim');

module.exports={
  async create(req,res){
    try{
      res.send(req.body);
      await claim.create(req.body);
    }catch(err){
      return res.status(400).send({error:'registration Failed'});
    }
  },
  async delete(req,res){
    await claim.findByIdAndDelete(req.params.id);
    return res.send('Deletado');
  },
  async update(req,res){
    const newClaim = await claim.findByIdAndUpdate(req.params.id, req.body, {new:true});
    return res.json(newClaim);
  },
  async listItem(req,res){
    const user = req.params.claimId;
    await claim.find({'user':user},(err,item)=>{
      if(err){
        return handleError(err);
      }else{res.json(item);}
    });
  },
  async search(req,res){
    try{
      const data = await claim.findById(req.params.id);
      return res.json(data);
    }catch(err){
      return console.log(err);
    }
  },
}