const AboutEDUGO = require('../models/aboutedugo')


const MentorAboutEdugoPost = async (req, res) => {
    let {Title ,Description,About} = req.body;

    console.log(req.file)
    const path = req.file.destination + "/" + req.file.originalname

    if (!path) throw new Error('no  images file')

    console.log(path)

    

    try {
        if (!(Title && Description && About )) {
            res
                .status(400)
                .json({ message: "All fields are required", status: false });
        } else {
            const getResponce = await AboutEDUGO.create({
                Title,
                Description,
                Images:path
            });

            if (!getResponce) {
                res
                    .status(400)
                    .json({ message: "About Edugo not  Has Added", status: false });
            } else {
                res.status(200).json({
                    message: "About Edugo successfully",
                    data: getResponce,
                    status: true,
                });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
}


const GetAllAboutEdogu = async (req, res) => {
    try {
        const getMentorOnboard = await AboutEDUGO.find();
        if (!getMentorOnboard) {
            res.json({ message: "there is no Students List", status: false });
        }
        res.json({
            message: "Found  All News",
            data: getMentorOnboard,
            status: true,
        });
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};

const UpdateMentorAboutEdugo = async (req, res) => {
    let { Title ,Description ,About} = req.body;

    console.log(req.file)
    const path = req.file.destination + "/" + req.file.originalname

    if (!path) throw new Error('no  images file')

    console.log(path)
    try {
        const UpdateStudentsList = await AboutEDUGO.findOneAndUpdate(
            { id: req.params._id }, {Title,Description,Images:path }
        );
        if (!UpdateStudentsList) {
            res.json({ message: "Enter the correct id", status: false });
        } else {
            res.json({
                message: "About Edugo Posted successsfully",
                data: UpdateStudentsList,
                status: true,
            });
        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};



module.exports = {
    MentorAboutEdugoPost,
    GetAllAboutEdogu,
    UpdateMentorAboutEdugo
    
}