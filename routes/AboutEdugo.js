
const router = require("express").Router();

const { isAuthenticated } = require("../controllers/middlewares/auth");

const path = require("path");
var multer = require("multer");

const {MentorAboutEdugoPost, GetAllAboutEdogu, UpdateMentorAboutEdugo } = require("../controllers/aboutedugo");
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
router.post('/mentor-about-edugo', upload.single("Images"),MentorAboutEdugoPost)
router.get('/get-all-mentor-about-edugo',GetAllAboutEdogu)
router.patch('/udate-any-about-edugo/:id',upload.single("Images"),UpdateMentorAboutEdugo)

module.exports = router;

