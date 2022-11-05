const Student = require('../models/student')


const AddStudent = async (req, res) => {
    let { Student_Name, Class } = req.body;

    console.log(req.file)
    const path = req.file.destination + "/" + req.file.originalname

    if (!path) throw new Error('no  images file')

    console.log(path)
  
    try {
        if (!(Student_Name && Class)) {
            res
                .status(400)
                .json({ message: "All fields are required", status: false });
        } else {
            const getResponce = await Student.create({
                Student_Name,
                Class,
                Student_Images:path
            });

            if (!getResponce) {
                res
                    .status(400)
                    .json({ message: "Students not  Has Added", status: false });
            } else {
                res.status(200).json({
                    message: "Student List   is  Added successfully",
                    data: getResponce,
                    status: true,
                });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
}


//Subject List
const GetAllStudents = async (req, res) => {
    try {
        const getMentorOnboard = await Student.find();
        if (!getMentorOnboard) {
            res.json({ message: "there is no Students List", status: false });
        }
        res.json({
            message: "Found  All Students List",
            data: getMentorOnboard,
            status: true,
        });
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};


//update students List
const UpdateStudentLists = async (req, res) => {
    // let { Student_Name, Class } = req.body;
    let { Student_Name, Class } = req.body;

    console.log(req.file)
    const path = req.file.destination + "/" + req.file.originalname

    if (!path) throw new Error('no  images file')

    console.log(path)
    try {
        const UpdateStudentsList = await Student.findOneAndUpdate(
            { id: req.params._id }, { Student_Name, Class, Student_Images: path }
        );
        if (!UpdateStudentsList) {
            res.json({ message: "Enter the correct id", status: false });
        } else {
            res.json({
                message: "Students List   has updated successsfully",
                data: UpdateStudentsList,
                status: true,
            });
        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};


module.exports ={
    AddStudent,
    GetAllStudents,
    UpdateStudentLists
}
