const mongoose = require("mongoose");
const MentorNewsSchema = new mongoose.Schema({

    Title:{type:String},
    News_Description:{type:String},
    News_Images:{type:String},

},

{timestamps: true,

})

module.exports = mongoose.model("News", MentorNewsSchema);
