const mongoose = require('mongoose');

const AttendenceSchema = new mongoose.Schema({

UserId: {type: String},
 
// Date: {type: String},

// Subject : {type: String},

// TotalPresent: {type: String},

// TotalSession: {type: String},

// TotalAttendance: {type: String},


Student_List: {
    type: [String],
    default: null,
  },
  
Student_Present: {
    type: [String],
    default: null,
  },

  Student_Absent: {
    type: [String],
    default: null,
  },

}, 
 { timestamps: true});

module.exports = mongoose.model('Attendence', AttendenceSchema);