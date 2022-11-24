const mongoose = require('mongoose');

const NotificationSettingSchema = new mongoose.Schema({
    
 UserId: {type: String},
 
ActiveNotification: {type: Boolean},

}, 
 { timestamps: true});

module.exports = mongoose.model('Notification', NotificationSettingSchema)