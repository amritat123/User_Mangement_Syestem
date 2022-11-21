const mongoose = require("mongoose");
const StudentConnectionSchema = new mongoose.Schema({

    userID:{type:String},
    Friend_ID:{type:String},
    status:{type:String},
    // id:{type:String}


},

{timestamps: true,

})

module.exports = mongoose.model("conectionstudents", StudentConnectionSchema);
