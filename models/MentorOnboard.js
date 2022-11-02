const mongoose = require('mongoose');

const MentorOnboardSchema = new mongoose.Schema({

    CV: { type: String },

    Feld: { type: String },

    Verification: { type: String },

    DOB: { type: String, required: true },

    ID: { type: String, required: true },

    // created: { type: String, default: new Date().toISOString() },


},
    { timestamps: true });

module.exports = mongoose.model('MentorOnboard', MentorOnboardSchema);

