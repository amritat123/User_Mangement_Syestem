const { postMentorProfiles, postMentorOnboard, GetMentorOnboard, GetMentorOnboardByUserId } = require("../controllers/MentorProfiles");

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

router.post('/mentorprofiles', isAuthenticated, upload.fields([{ name: "myField", maxCount: 1}, {name: "myField2", maxCount: 1 }]), postMentorProfiles)
router.post('/mentoronboard', isAuthenticated, postMentorOnboard)

router.get('/getMnetorOnboard', isAuthenticated,GetMentorOnboard)

router.get('/mentorprofilebyuserid', isAuthenticated,GetMentorOnboardByUserId)



// const auth = require("..middleware/authentication");
// const MentorProfiles = require("../controllers/MentorProfiles");
// const path = require("path");
// const mentorID=require('')

// router.post("/mentorprofiles", (req, res) => {
//     const filePath = path.join(
//         "C:/home/rubi / Downloads / DUGO - PROJECT / userUpload",
//         `${mentorID}.MP4`
//     );
//     MentorProfiles(req, filePath)
//         .then((path) =>
//             res.status(200).send({ status: "file uploaded successfully", path })
//         )
//         .catch((err) =>
//             res.status(500).send({ status: "Internal server error", err })
//         );
// });


module.exports = router;