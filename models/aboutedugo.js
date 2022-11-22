const mongoose = require("mongoose");
const AboutEdugoSchema = new mongoose.Schema({

    Title:{type:String},
    Description:{type:String},
    Images:{type:String},
    About:{type:String},
    

},

{timestamps: true,

})

module.exports = mongoose.model("About", AboutEdugoSchema);
