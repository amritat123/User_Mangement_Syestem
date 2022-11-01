const router = require('express').Router();
const Usercontroller = require('../controllers/Usercontroller');

//signUpUser

router.post('/signup', Usercontroller.signUp);

//login
router.post('/login', Usercontroller.login);


//verify--
router.post('/verify', Usercontroller.verify_OTP);


// reset routes
//resetpassword
router.post('/resetpassword', Usercontroller.RestPasswordsendOTP);

//otpcheck
router.post('/otpcheck', Usercontroller.RestPasswordOtp);

//RestPasswordLink
router.post('/reset', Usercontroller.RestPassword);




module.exports = router;



