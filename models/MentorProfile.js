const mongoose = require('mongoose');

const MentorProfilesdSchema = new mongoose.Schema({

    AboutYou: { type: String },

    AgeGroups: { type: String },

    Courses: { type: String },

    Mentor_Profiles: { type: String, required: true },

    Intro_Video: { type: String, required: true },

},
    { timestamps: true });

module.exports = mongoose.model('MentorProfiles', MentorProfilesdSchema);


