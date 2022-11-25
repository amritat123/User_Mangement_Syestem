const router = require("express").Router();
const { postMentorProfiles, 
    postMentorOnboard, 
    GetMentorOnboard, 
    GetMentorOnboardByUserId, 
    SearchMentorName, 
    FeatureMentor, 
    GetByMentoriDCertificate, 
    GetMentorSubject, 
    GetByMentorProfilesByuserId} = require("../controllers/MentorProfiles");

const { isAuthenticated } = require("../controllers/middlewares/auth");


// const path = require("path");
// var multer = require("multer");
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/images");
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "_" + file.originalname);
//         // cb(null, Date.now() + file.originalname);
//     },
// });


const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({

destination: function (req, file, cb) {
cb(null, "public") },


filename: function (req, file, cb) {
    let newname = Math.floor(10000000000 + Math.random() * 90000000000) + "." + file.originalname.split(".")[1]
    file.originalname=newname
    cb(null, file.originalname);},});

var upload = multer({ storage: storage });


// router.post('/mentorprofiles', isAuthenticated, upload.fields([{ name: "myField", maxCount: 1}, {name: "myField2", maxCount: 1 }]), postMentorProfiles)
router.post('/mentorprofiles', isAuthenticated, upload.single("MentorImages"), postMentorProfiles)

router.post('/mentoronboard', isAuthenticated, postMentorOnboard)

router.get('/getMnetorOnboard', isAuthenticated,GetMentorOnboard)

router.get('/mentorprofilebyuserid', isAuthenticated,GetMentorOnboardByUserId)

router.get('/Searchbymentornamesubjectage',SearchMentorName)

router.post('/featurementor',isAuthenticated,upload.single("Mentor_Profiles"),FeatureMentor)

router.get('/get-by-mentor-id',isAuthenticated,GetByMentoriDCertificate)

router.get('/get-by-mentor-subject/:subject',isAuthenticated,GetMentorSubject)

router.get('/get-by-user-id-mentor-rofiles',isAuthenticated,GetByMentorProfilesByuserId)




module.exports = router;