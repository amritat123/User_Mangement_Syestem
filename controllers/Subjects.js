const Subject = require('../models/subject')
const moment = require("moment");

//AddSubject

const AddAnySubject = async (req, res) => {
    let { Subject_Name } = req.body;

    try {
        if (!(Subject_Name)) {
            res
                .status(400)
                .json({ message: "All fields are required", status: false });
        } else {
            const getResponce = await Subject.create({
                Subject_Name,
            });

            if (!getResponce) {
                res
                    .status(400)
                    .json({ message: "Subject  not  Has Added", status: false });
            } else {
                res.status(200).json({
                    message: "Sujcet  is  Added successfully",
                    data: getResponce,
                    status: true,
                });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
}



//GetAll Subjects
const GetAllSubject = async (req, res) => {
    try {
        const getMentorOnboard = await Subject.find();
        if (!getMentorOnboard) {
            res.json({ message: "there is no Courses Type", status: false });
        }
        res.json({
            message: "Found  All Subjets",
            data: getMentorOnboard,
            status: true,
        });
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};



//DeletSubject
const DeleteSubjects = async (req, res) => {
    try {
        const deteleQuestionDetails = await Subject.findOneAndDelete({
            _id: req.params.id,
        });
        if (!deteleQuestionDetails) {
            res.json({ message: "Enter the correct id", status: false });
        } else {
            res.send({
                message: "Subjects  has deleted successfully",
                status: true,
            });
        }
    } catch (error) {
        res.send({ message: error.message, status: false });
    }
};


//Update Subject
const UpdateSubejcts = async (req, res) => {
    let { Subject_Name } = req.body;
    try {
        const UpdateQuestionsdata = await Subject.findOneAndUpdate(
            { id: req.params._id }, { Subject_Name }
        );
        if (!UpdateQuestionsdata) {
            res.json({ message: "Enter the correct id", status: false });
        } else {
            res.json({
                message: "Subjects  has updated successsfully",
                data: UpdateQuestionsdata,
                status: true,
            });
        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};


//SearchBy Subject
const SearchAnySubject = async (req, res) => {
    const search = req.query.search
    try {
        const student = await Subject.find({ Subject_Name: { "$regex": search, "$options": "i" } });
        if (!student) {
            res.json({ message: "Subjects Is not Found", status: false });
        } else {
            res.json({
                message: "Subjects   is found",
                student: student,
                status: true
            });

        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};



//BulkAddSubject

// const BulkAddSubject = async (req, res) => {
//     let { Subject_Name } = req.body;

//     try {
//         if (Subject_Name.length == 0) {
//             res
//                 .status(400)
//                 .json({ message: "All fields are required", status: false });
//         } else {
//             let getResponce = []
//             for (let i = 0; i < Subject_Name.length; i++) {
//                 get = await Subject.create({
//                     Subject_Name: Subject_Name[i].Subject_Name,
//                 });
//                 getResponce = [...getResponce, get]

//             }

//             if (getResponce.length == 0) {
//                 res
//                     .status(400)
//                     .json({ message: "Subject  not  Has Added", status: false });
//             } else {
//                 res.status(200).json({
//                     message: "Sujcet  is  Added successfully",
//                     data: getResponce,
//                     status: true,
//                 });
//             }
//         }
//     } catch (error) {
//         res.status(400).json({ message: error.message, status: false });
//     }
// }


module.exports = {
    // postPicASubject,
    AddAnySubject,
    GetAllSubject,
    DeleteSubjects,
    UpdateSubejcts,
    SearchAnySubject,
    // BulkAddSubject
}