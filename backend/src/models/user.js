const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  _id:{
    type:String,
    required:true,
    unique:true,
  },
  name:{
    type:String,
    required:true,
    unique:true,
  },
  sexo:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    lowercase: true,
    unique:true,
  },
  password:{
    type:String,
    required: true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
  taskCoin:{
    type:Number,
    required:true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;