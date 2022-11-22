

const Attendence = require('../models/Attendence');
const { getByOne, Patchdata, getBy, postdata,  Deletedata } = require('../services/routes');


//postStudent

// const AttendenceStudentpost = async (req, res) => {
//   const data = await postdata(Attendence, req.body)
//   res.status(200).json({
//     message: 'successfully',
//     data: data
//   })
// }
const AttendenceStudentpost = async (req, res) => {
  let { Student_List, Student_Present,Student_Absent,UserId } = req.body;
  try {
      if (!(Student_List && Student_Present && Student_Absent && UserId )) {
          res
              .status(400)
              .json({ message: "All fields are required", status: false });
      } else {
          const getResponce = await Attendence.create({
            Student_List,
            Student_Present,
            Student_Absent,
            UserId

          });

          if (!getResponce) {
              res
                  .status(400)
                  .json({ message: "successfully", status: false });
          } else {
              res.status(200).json({
                  message: "successfully",
                  data: getResponce,
                  status: true,
              });
          }
      }
  } catch (error) {
      res.status(400).json({ message: error.message, status: false });
  }
}


const getAttendenceOfStuydent = async (req, res) => {
  try {
      const getMentorOnboard = await Attendence.find();
      if (!getMentorOnboard) {
          res.json({ message: "there is no Students List", status: false });
      }
      res.json({
          message: " Data Found",
          data: getMentorOnboard,
          status: true,
      });
  } catch (error) {
      res.json({ message: error.message, status: false });
  }
};



const CountOfStudentsAttendance = async(req,res) =>{
  try {
      const absent = await Attendence.find();
  
        res.status(200).json({message:"Absent Students ",Student_Absent:absent})
      
  } catch (error) {
      res.json({ message: error.message, status: false });
      
  }
}


const CountOfStudentsAttendancePresent = async(req,res) =>{
  try {
      const absent = await Attendence.find();
  
        res.status(200).json({message:"Present Students ",Student_Present:absent.length})
      
  } catch (error) {
      res.json({ message: error.message, status: false });
      
  }
}


// const TotalCountOfStudentsList = async(req,res) =>{
//   try {
//       const Total_Students = await Student.find();
//       res.status(200).json({message:"Total Students Of list",Total_Number_Of_Students:Total_Students.length})
//   } catch (error) {
//       res.json({ message: error.message, status: false });
      
//   }
// }



// const getAttendenceOfStuydent = async (req, res) => {
//     const course = await getBy (Attendence) 
//   res.status(200).json({
//     message: 'Student View  Attendence ',
//     course:course
//     })
// };


const StudentAttendenceEdit = async (req, res) => {
  const data=await Patchdata(Attendence,{ _id: req.params.id },req.body)
  res.status(200).json({
    message: 'Student Attendence Edit Successfully',
    data:data
  })
    
  
}


const DeleteStudentAttendence = async (req, res) => {
  const data=await Deletedata(Attendence,{ _id: req.params.id })
  res.status(200).json({
    message: 'Student Attendence Remove Successfully',
    data:data
  })    
};




module.exports ={
  AttendenceStudentpost,
  getAttendenceOfStuydent,
  StudentAttendenceEdit,
  DeleteStudentAttendence,
  CountOfStudentsAttendance,
  CountOfStudentsAttendancePresent


}