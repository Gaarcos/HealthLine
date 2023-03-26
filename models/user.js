const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  fullName: {
    type: String,
    required:true,
    trim:true,
  },
  phone: {
    type:String,
    unique: true,
    required:true,
    trim:true,
  },
  cep:{
    type:String,
    required:true,
    trim:true,
  },
  adress:{
    type:String,
    required:true,
    trim:true,
  },
  adressNumber:{
    type:Int32Array,
    required:true,
    trim:true,
  },
  adressComplement:{
    type:String,
    required:false,
    trim:true,
  },
  sex:{
    type:String,
    required:true,
    trim:true,
  },
  birthDate:{
    type:Date,
    required:true,
    trim:true,
  },
  cpf:{
    type:String,
    required:true,
    trim:true,
    unique:true,
  },
  civilState:{
    type:String,
    required:true,
    trim:true,
  },
  prescriptions:{
    type:String,
    trim:true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;