//declaring mongoose module, mongosse is a ODM which manages the relationship b/w data and provides schema validation.
const mongoose = require('mongoose');

//defining schema, it represents the structure of the document                                        
const userSchema = new mongoose.Schema({

  Name: { type: String },
  Email: { type: String },
  profile_photo: { type: String },
  created: { type: String, default: new Date().toISOString() },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
  role: {type: String,default:"user"},
  otp: { type: String, required: true },
  
// Timestamps save the current time of the document created.
}, { timestamps: true });

//exporting it and mongoose.model.here User is model name and schema                                                                                                                                                   
module.exports = mongoose.model('Users', userSchema);

