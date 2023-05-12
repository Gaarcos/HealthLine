const mongoose = require('../config/database');

const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  senha: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  nome: { 
    type: String,
    required: true,
    trim: true,
  },
  telefone: { 
    type: String,
    trim: true,
  },
  cep: {
    type: String,
    required: true,
    trim: true,
  },
  endereco: { 
    type: String,
    required: true,
    trim: true,
  },
  numero: { 
    type: String,
    required: true,
    trim: true,
  },
  complemento: { 
    type: String,
    required: false,
    trim: true,
  },
  genero: { 
    type: String,
    required: true,
    trim: true,
  },
  dataNascimento: { 
    type: Date,
    required: true,
    trim: true,
  },
  cpf: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  estadoCivil: { 
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: false,
    trim: true
  },
  prescriptions: {
    type: String,
    trim: true,
  },
});

userSchema.pre("save", async function (next) {
  const hash = await bcryptjs.hash(this.senha, 10);
  this.senha = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;