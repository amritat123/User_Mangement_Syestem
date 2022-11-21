const  CourseType = require('../models/Cousetype')
const moment = require("moment");

const postCourseType = async (req, res) => {
    let { Course_ID,Course_name } = req.body;

    try {
        if (!(Course_name && Course_ID)) {
            res
                .status(400)
                .json({ message: "All fields are required", status: false });
        } else {
            const getResponce = await CourseType.create({
                Course_ID,
                Course_name,
                time: moment().format("llll"),
            });

            if (!getResponce) {
                res
                    .status(400)
                    .json({ message: "Courses  not  Has Posted", status: false });
            } else {
                res.status(200).json({
                    message: "Cousres Types  is  created successfully",
                    data: getResponce,
                    status: true,
                });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
}

//getAll Coures
const GetAllCouresType = async (req, res) => {
    try {
        const getMentorOnboard = await CourseType.find();
        if (!getMentorOnboard) {
            res.json({ message: "there is no Courses Type", status: false });
        }
        res.json({
            message: "Found  All Courses Types",
            data: getMentorOnboard,
            status: true,
        });
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};


module.exports = {
    postCourseType,
    GetAllCouresType

}