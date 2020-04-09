const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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
  },
})

const Task = mongoose.model('Task',taskSchema);

module.exports=Task;