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
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  cep: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  addressNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  addressComplement: {
    type: String,
    required: false,
    trim: true,
  },
  sex: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
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
  civilState: {
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
  const hash = await bcryptjs.hash(this.password, 10);
  this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;