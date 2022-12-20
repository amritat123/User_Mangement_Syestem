const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  Name: { type: String },
  Email: { type: String },
  profile_photo: { type: String },
  created: { type: String, default: new Date().toISOString() },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
  role: {type: String,default:"user"},
  otp: { type: String, required: true },
  
}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema);
