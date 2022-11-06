const mongoose = require('mongoose');

const MentorProfilesdSchema = new mongoose.Schema({

    AboutYou: { type: String },

    AgeGroups: { type: String },

    Courses: { type: String },

    Mentor_Profiles: { type: String, required: true },

    Intro_Video: { type: String, required: true },

    userId:{type:String},

    CV: { type: String, default: null },

    Feld: { type: String, default: null },

    Verification: { type: String, default: null },

    DOB: { type: String, default: null },

    ID: { type: String, default: null },


},
    { timestamps: true });

module.exports = mongoose.model('MentorProfiles', MentorProfilesdSchema);


