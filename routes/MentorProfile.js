const { postMentorProfiles } = require("../controllers/MentorProfiles");

const router = require("express").Router();


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

router.post('/mentorprofiles', upload.single("myField"), postMentorProfiles)


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