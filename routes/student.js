// const { postMentorProfiles } = require("../controllers/MentorProfiles");

const router = require("express").Router();


const path = require("path");
var multer = require("multer");

const { AddStudent, GetAllStudents, UpdateStudentLists, TotalCountOfStudents } = require("../controllers/Student");
const { totalmem } = require("os");
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

router.get('/count-total-student',TotalCountOfStudents)


module.exports = router;