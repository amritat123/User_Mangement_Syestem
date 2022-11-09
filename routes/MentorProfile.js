const { postMentorProfiles, postMentorOnboard, GetMentorOnboard, GetMentorOnboardByUserId, SearchMentorName, FeatureMentor } = require("../controllers/MentorProfiles");

const router = require("express").Router();

const { isAuthenticated } = require("../controllers/middlewares/auth");

const path = require("path");
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

var upload = multer({ storage: storage });

// router.post('/mentorprofiles', isAuthenticated, upload.fields([{ name: "myField", maxCount: 1}, {name: "myField2", maxCount: 1 }]), postMentorProfiles)
router.post('/mentorprofiles', isAuthenticated, upload.single("MentorImages"), postMentorProfiles)

router.post('/mentoronboard', isAuthenticated, postMentorOnboard)

router.get('/getMnetorOnboard', isAuthenticated,GetMentorOnboard)

router.get('/mentorprofilebyuserid', isAuthenticated,GetMentorOnboardByUserId)

router.get('/Searchbymentornamesubjectage',SearchMentorName)

router.post('/featurementor',isAuthenticated,upload.single("Mentor_Profiles"),FeatureMentor)




module.exports = router;