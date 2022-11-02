const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  first_Name: { type: String },

  last_Name: { type: String },

  Email: { type: String },

  created: { type: String, default: new Date().toISOString() },

  password: { type: String, required: true },

  active: { type: Boolean, default: false },

  otp: { type: String, required: true },
  
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

