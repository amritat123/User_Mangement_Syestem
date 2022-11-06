const mongoose = require('mongoose');

// const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  content: String,
  from: Object,
  time: String,
  date: String,
  to: String
}, { timestamps: true })

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message