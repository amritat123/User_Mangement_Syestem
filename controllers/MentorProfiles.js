const MentorProfiles = require("../models/MentorProfile");

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
  let { AboutYou, AgeGroups, Courses, Intro_Video} =
    req.body;
  // console.log(req.user.user._id)
  let userId = req.user;

  console.log(req.file);
  const path = req.file.destination + "/" + req.file.originalname;

  if (!path) throw new Error("no  images file");

  console.log(path);

  try {
    if (
      !(
        AboutYou &&
        AgeGroups &&
        Courses &&
        Intro_Video 

      )
    ) {
      res
        .status(400)
        .json({ message: "All fields are required", status: false });
    } else {
      if (AgeGroups > 4 && AgeGroups <= 99) {
        let Existing = await MentorProfiles.findOne({ userId });

        if (Existing) {
          let getResponce = await MentorProfiles.findOneAndUpdate(
            { userId },
            {
              AboutYou,
              AgeGroups,
              Courses,
              Intro_Video,
              Mentor_Profiles: path,
              userId,
            }
          );
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
            userId,
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
      } else {
        res.status(400).json({ message: "AgeGroups is Over", status: false });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//PostMentorOnbord
const postMentorOnboard = async (req, res) => {
  let { Feld, Verification, DOB, CV, ID } = req.body;
  let userId = req.user;

  try {
    if (!(Feld && Verification && DOB && CV && ID)) {
      res
        .status(400)
        .json({ message: "All fields are required", status: false });
    } else {
      let Existing = await MentorProfiles.findOne({ userId });

      if (Existing) {
        let getResponce = await MentorProfiles.findOneAndUpdate(
          { userId },
          {
            Feld,
            Verification,
            DOB,
            CV,
            ID,
            userId,
          }
        );

        if (!getResponce) {
          res
            .status(400)
            .json({ message: "Mentor Onboard not updated ", status: false });
        } else {
          res.status(200).json({
            message: "Mentor Onboared is Updated successfully",
            data: getResponce,
            status: true,
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};



//GetAPI
const GetMentorOnboard = async (req, res) => {
  try {
    const getMentorOnboard = await MentorProfiles.find();
    if (!getMentorOnboard) {
      res.json({ message: "there is no Mentor Onboard", status: false });
    }
    res.json({
      message: "Found  Mnetor Onboard",
      data: getMentorOnboard,
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//GetByUserId
const GetMentorOnboardByUserId = async (req, res) => {
  try {
    let userId = req.user;
    const getMentorOnboard = await MentorProfiles.findOne({ userId: userId });
    if (!getMentorOnboard) {
      res.json({ message: "there is no Mentor Onboard", status: false });
    }
    res.json({
      message: "Found  Mentor Onboard",
      data: getMentorOnboard,
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Search APIs
// const SearchMentorName = async (req, res) => {
//     const search = req.query.search
//     try {
//         const student = await MentorProfiles.find({ MentorName: { "$regex": search, "$options": "i" } });
//         if (!student) {
//             res.json({ message: "Subjects Is not Found", status: false });
//         } else {
//             res.json({
//                 message: "Subjects   is found",
//                 student: student,
//                 status: true
//             });

//         }
//     } catch (error) {
//         res.json({ message: error.message, status: false });
//     }
// };

const SearchMentorName = async (req, res) => {
  const { Name, AgeGroups, Subject } = req.query;
  try {
    const getResponce = await MentorProfiles.find({
      $and: [
        {
          Name: { $regex: Name, $options: "i" },
        },
        {
          AgeGroups: { $regex: AgeGroups.toString(), $options: "i" },
        },
        {
          Subject: { $regex: Subject, $options: "i" },
        },
      ],
    });

    if (getResponce.length == 0) {
      res.json({ message: "there is no data", status: false });
    } else {
      res.json({
        message: "data  Post  is found",
        student: getResponce,
        status: true,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//FeatureMentor
const FeatureMentor = async (req, res) => {
  let { Name, AgeGroups, Subject } = req.body;
  console.log("sss")

  console.log(req.file);
  const path = req.file.destination + "/" + req.file.originalname;

  if (!path) throw new Error("no  images file");

  console.log(path);

  try {
    if (!(Name && AgeGroups && Subject)) {
      res
        .status(400)
        .json({ message: "All fields are required", status: false });
    } else {
      const getResponce = await MentorProfiles.create({
        Name,
        AgeGroups,
        Subject,
        Mentor_Profiles: path,
      });

      if (!getResponce) {
        res
          .status(400)
          .json({ message: "MentorFeature is not there", status: false });
      } else {
        res.status(200).json({
          message: "MentorFeature successfully",
          data: getResponce,
          status: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};



module.exports = {
  postMentorProfiles,
  postMentorOnboard,
  GetMentorOnboard,
  GetMentorOnboardByUserId,
  SearchMentorName,
  FeatureMentor,
  // appSetting
};
