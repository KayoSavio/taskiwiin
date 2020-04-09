const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  _id:{
    type:String,
    required:true,
  },
  taskId:{
    type:String,
    required:true,
  },
  user:{
    type:String,
    require:true,
  },
  name:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  persona:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  }
})

const history = mongoose.model('History',historySchema);

module.exports=history;