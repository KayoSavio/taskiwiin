const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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
  recompensa:{
    type:String,
    required:true,
  },
  dificuldade:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
})

const Task = mongoose.model('Task',taskSchema);

module.exports=Task;