const StudentsConnection = require('../models/studentconnection')

//Follow---
const StudentsFollow = async (req, res) => {

    // req.user = user.user._id;
    // console.log(req.user)
  
    try {
      const { userID, Friend_ID, status } = req.body;
  
      let Existing = await StudentsConnection.findOne({ userID, Friend_ID, status });
      if (Existing) {
        // res.status(400).json({ message: "there is no connection", Existing });
      }
  
      let conection = await StudentsConnection.create({ userID, Friend_ID, status });

      res.status(200).json({ message: "Follow request sent", conection });
    } catch (e) {
      res.status(400).json(e.message);
    }
  };
  

//GetAllActiveFollowingStudents
  const GetAllActiveFollowingStudents = async (req, res) => {
    try {
      const userID = req.params.id;
      let conection = await StudentsConnection.find({ userID })
        .where("status")
        .equals("active");
      res.status(200).json({ message: "Active Following Students List", conection });
    } catch (e) {
      res.status(400).json(e.message);
    }
  };
  


// //GetallPendingFollowing
const GetAllPendingFollowingStudents = async (req, res) => {
    try {
      const userID = req.params.id;
      let conection = await StudentsConnection.find({ userID })
        .where("status")
        .equals("pending");
      res.status(200).json({ message: "Pending Following Students ", conection });
    } catch (e) {
      res.status(400).json(e.message);
    }
  };
  


// //GetAllActiveFollow
const GetAllActiveFollowStudents = async (req, res) => {
    try {
      const Friend_ID = req.params.id;
      let conection = await StudentsConnection.find({ Friend_ID })
        .where("status")
        .equals("active");
      res
        .status(200)
        .json({ message: "Active Fellow Views", data: conection, Status: true });
    } catch (e) {
      res.status(400).json(e.message);
    }
  };



// //GetallPendingFollow--
const GetAllPendingFollowStudents = async (req, res) => {
    try {
      const Friend_ID = req.params.id;
      let conection = await StudentsConnection.find({ Friend_ID })
        .where("status")
        .equals("pending");
      res
        .status(200)
        .json({
          message: "All Pending Fellow Students",
          conection: conection,
          status: true,
        });
    } catch (e) {
      res.status(400).json(e.message);
    }
  };



  

  module.exports ={
    StudentsFollow,
    GetAllActiveFollowingStudents,
    GetAllPendingFollowingStudents,
    GetAllActiveFollowStudents,
    GetAllPendingFollowStudents
  }

