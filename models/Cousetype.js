const mongoose = require('mongoose');

const CourseTypeSchema = new mongoose.Schema({

    long_Term_Course: { type: String },

    Short_Term_Course: { type: String },

    Webinar: { type: String },

    created: { type: String, default: new Date().toISOString() },

    Library_Coming_Soon: { type: String, required: true },

} , 

{ timestamps: true });

module.exports = mongoose.model('CourseType', CourseTypeSchema);

