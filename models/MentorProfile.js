const mongoose = require('mongoose');

const MentorProfilesdSchema = new mongoose.Schema({

    AboutYou: { type: String },

    AgeGroups: { type: String },

    Courses: { type: String },

    Mentor_Profiles: { type: String, required: true },

    Intro_Video: { type: String },

    userId:{type:String},

    CV: { type: String },

    Feld: { type: String},

    Verification: { type: String },

    DOB: { type: String },

    ID: { type: String},

    // MentorName :{type:String},

    Subject :{type:String},

    

    Name:{
        type:String
    }


},
    { timestamps: true });

module.exports = mongoose.model('MentorProfiles', MentorProfilesdSchema);


