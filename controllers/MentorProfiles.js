const MentorProfiles = require('../models/MentorProfile')


// const fs = require("fs");

// const appSetting = async (req, filePath) => {
//     return new Promise((resolve, reject) => {
//         const stream = fs.createWriteStream(filePath);

//         stream.on("open", () => {
//             console.log("Stream open ...  0.00%");
//             req.pipe(stream);
//         });


//         stream.on("drain", () => {
//             const written = parseInt(stream.bytesWritten);
//             const total = parseInt(req.headers["content-length"]);
//             const pWritten = ((written / total) * 100).toFixed(2);
//             console.log(`Processing  ...  ${pWritten}% done`);
//         });


//         stream.on("close", () => {
//             console.log("Processing  ...  100%");
//             resolve(filePath);
//         });

//         stream.on("error", (err) => {
//             console.error(err);
//             reject(err);
//         });
//     });


// };



//postMentorProfiles
const postMentorProfiles = async (req, res) => {
    // let photo = req.body
    // photo['blog_Images'] = req.file.originalname

    let { AboutYou, AgeGroups, Courses, Intro_Video } = req.body;
    // console.log(req.user.user._id)
    let userId = req.user

    console.log(req.file)
    const path = req.file.destination + "/" + req.file.originalname

    if (!path) throw new Error('no  images file')

    console.log(path)
    try {
        if (!(AboutYou && AgeGroups && Courses && Intro_Video)) {
            res.status(400).json({ message: "All fields are required", status: false });

        } else {
            if ((AgeGroups > 4) && (AgeGroups <= 99)) {
                let Existing = await MentorProfiles.findOne({ userId })

                if (Existing) {

                    let getResponce = await MentorProfiles.findOneAndUpdate({ userId }, {
                        AboutYou,
                        AgeGroups,
                        Courses,
                        Intro_Video,
                        Mentor_Profiles: path,
                        userId

                    });
                    if (!getResponce) {
                        res
                            .status(400)
                            .json({ message: "Mentor Profiles not updated ", status: false });
                    } else {
                        res.status(200).json({
                            message: "Mentor Profiles is Updated successfully",
                            data: getResponce,
                            status: true,
                        });
                    }

                } else {

                    let getResponce = await MentorProfiles.create({
                        AboutYou,
                        AgeGroups,
                        Courses,
                        Intro_Video,
                        Mentor_Profiles: path,
                        userId

                    });
                    if (!getResponce) {
                        res
                            .status(400)
                            .json({ message: "Mentor Profiles not Created", status: false });
                    } else {
                        res.status(200).json({
                            message: "Mentor Profiles is created successfully",
                            data: getResponce,
                            status: true,
                        });
                    }

                }


            }
            else {
                res.status(400).json({ message: "AgeGroups is Over", status: false })
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
}

module.exports = {
    postMentorProfiles,
    // appSetting
}