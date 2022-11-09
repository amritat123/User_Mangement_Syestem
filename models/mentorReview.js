
const mongoose = require('mongoose');

const MentorReviewsSchema = new mongoose.Schema({

    MentorID:
    {
        type: String,
    },

    StudentID:{
        type:String
    },

    ReviewMessage:{
        type:String
    },

    Students_Views:{
        type:String
    },

    ReviewStar:{
        type:String
    },

    ReviewScore:{
        type:String
    },

    Date:{
        type:String
    },

    Subject:{
        type:String
    },

    SubjectID:{
        type:String
    },

    CourseID:{
        type:String
    },

    TotalCourses:{
        type:String
    },
    
    Subscribers:{
        type:String
    },
    Total_no_of_students :{
        type:String
    },
    
    Total_students_enrolled :{
        type:String
    },
    Daily_classes:{
        type:String
    },
    Earnings:{
        type:String
    },
   
},
 { timestamps: true });


module.exports = mongoose.model('MentorReviews', MentorReviewsSchema);





