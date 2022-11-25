const mongoose = require('mongoose');

const MentorProfilesdSchema = new mongoose.Schema({

    AboutYou: "tanu yadav",
    AgeGroups:"18",
    Courses: "Sceince",
    Mentor_Profiles: "",
    Intro_Video: "",
    userId: "",
    CV: "",
    Feld: "",
    Verification: "",
    DOB: "",
    ID: "",
    Subject: "",
    Name:""

    
})


module.exports = mongoose.model('MentorProfiles', MentorProfilesdSchema);


