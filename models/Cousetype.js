const mongoose = require('mongoose');

const CourseTypeSchema = new mongoose.Schema({

    Course_ID: { type: String },

    Course_name: { type: String },

    created: { type: String, default: new Date().toISOString() },
} , 

{ timestamps: true });

module.exports = mongoose.model('CourseType', CourseTypeSchema);

