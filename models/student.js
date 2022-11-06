const mongoose = require('mongoose');

const Student_ListSchema = new mongoose.Schema({

    Student_Name:
    {
        type: String,
    },

    Class:{
        type:String
    },

    Student_Images:{
        type:String
    }


}, { timestamps: true });


module.exports = mongoose.model('Students', Student_ListSchema);

