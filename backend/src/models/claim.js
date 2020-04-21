const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  _id:{
    type:String,
    required:true,
  },
  claimId:{
    type:String,
    required:true,
  },
  user:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  coinValue:{
    type:Number,
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
})

const Claim = mongoose.model('Claim',claimSchema);

module.exports=Claim;