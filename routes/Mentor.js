const router = require('express').Router();
// const Usercontroller = require('../controllers/Mentor');

const { signUp, 
    login,
     verify_OTP, 
     RestPasswordsendOTP, 
     RestPasswordOtp, 
     RestPassword } = require('../controllers/Mentor')

//signUpUser

router.post('/signup',signUp);

//login
router.post('/login',login);


//verify--
router.post('/verify',verify_OTP);


// reset routes
//resetpassword
router.post('/resetpassword',RestPasswordsendOTP);

//otpcheck
router.post('/otpcheck',RestPasswordOtp);

//RestPasswordLink
router.post('/reset',RestPassword);




module.exports = router;



