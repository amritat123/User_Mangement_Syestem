// const mongoose = require('mongoose');

// const Pic_A_Subject_Schema = new mongoose.Schema({

//     Subject_Name: [
//         {
//             type: String,
//         },
//     ],


// }, { timestamps: true });

// module.exports = mongoose.model('Subjects', Pic_A_Subject_Schema);


const mongoose = require('mongoose');

const Pic_A_Subject_Schema = new mongoose.Schema({

    Subject_Name:
    {
        type: String,
    },


}, { timestamps: true });

module.exports = mongoose.model('Subjects', Pic_A_Subject_Schema);

