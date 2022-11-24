const News = require('../models/mentornews')


const MentorNewsPost = async (req, res) => {
    let {Title ,News_Description } = req.body;

    console.log(req.file)
    const path = req.file.originalname;

    if (!path) throw new Error('no  images file')

    console.log(path)


    try {
        if (!(Title && News_Description )) {
            res
                .status(400)
                .json({ message: "All fields are required", status: false });
        } else {
            const getResponce = await News.create({
                Title,
                News_Description,
                News_Images:path
            });

            if (!getResponce) {
                res
                    .status(400)
                    .json({ message: "News not  Has Added", status: false });
            } else {
                res.status(200).json({
                    message: "News   is  Added successfully",
                    data: getResponce,
                    status: true,
                });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
}


const GetAllNews= async (req, res) => {
    try {
        const getMentorOnboard = await News.find();
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

const UpdateMentorNews = async (req, res) => {
    let { Title ,News_Description} = req.body;

    console.log(req.file)
    const path = req.file.originalname;

    if (!path) throw new Error('no  images file')

    console.log(path)
    try {
        const UpdateStudentsList = await News.findOneAndUpdate(
            { id: req.params._id }, {Title, News_Description,News_Images:path }
        );
        if (!UpdateStudentsList) {
            res.json({ message: "Enter the correct id", status: false });
        } else {
            res.json({
                message: "News  has updated successsfully",
                data: UpdateStudentsList,
                status: true,
            });
        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};



module.exports = {
    MentorNewsPost,
    GetAllNews,
    UpdateMentorNews
    
}