const router = require('express').Router();
const { isAuthenticated } = require('../controllers/middlewares/auth');
// const Usercontroller = require('../controllers/Mentor');

const { signUp, login, verify_OTP, GetUser, EditUserDetails, DeleteUser, ChangeStatus } = require('../controllers/UserController')

//signUpUser

const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "public")
    },


    filename: function (req, file, cb) {
        let newname = Math.floor(10000000000 + Math.random() * 90000000000) + "." + file.originalname.split(".")[1]
        file.originalname = newname
        cb(null, file.originalname);
    },
});

var upload = multer({ storage: storage });

router.post('/signup', upload.single("profile_photo"), signUp);

//login
router.post('/login', login);


//verify--
router.post('/verify', verify_OTP);

//otpcheck
// router.post('/otpcheck',RestPasswordOtp);

router.get('/get-user-deatils', isAuthenticated, GetUser)
router.patch('/edit-user-deatils/:id', isAuthenticated, upload.single("profile_photo"), EditUserDetails)
router.delete('/delete-user-deatils/:id', isAuthenticated, DeleteUser)
router.post('/add/user', ChangeStatus)


module.exports = router;



