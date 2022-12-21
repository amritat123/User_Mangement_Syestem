// connecting env file
require('dotenv').config();

module.exports = {
  MAIL_SETTINGS: {
    host: "smtp.ethereal.email",

    port: 587,
    secure: false,
    // service: 'gmail',
    auth: {
      // connecting mail and password
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  },
};
