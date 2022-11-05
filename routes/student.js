// const { postMentorProfiles } = require("../controllers/MentorProfiles");

const router = require("express").Router();


const path = require("path");
var multer = require("multer");

const { AddStudent, GetAllStudents, UpdateStudentLists } = require("../controllers/Student");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

var upload = multer({ storage: storage });

router.post('/addstudent', upload.single("Student_Images"),AddStudent)

router.get('/getallStudentsList',GetAllStudents)

router.patch('/updatelist/:id', upload.single("Student_Images") ,UpdateStudentLists)


module.exports = router;