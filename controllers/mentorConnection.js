// const { model } = require('mongoose');
const Conection = require("../models/connection");


//Follow---
const Follow = async (req, res) => {

  // req.user = user.user._id;
  // console.log(req.user)

  try {
    const { userID, followersID, status } = req.body;

    let Existing = await Conection.findOne({ userID, followersID, status });
    if (Existing) {
      // res.status(400).json({ message: "there is no connection", Existing });
    }

    let conection = await Conection.create({ userID, followersID, status });
    res.status(200).json({ message: "Follow request sent", conection });
  } catch (e) {
    res.status(400).json(e.message);
  }
};



//getAllActiveFollowing--
const GetAllActiveFollowing = async (req, res) => {
  try {
    const userID = req.params.id;
    let conection = await Conection.find({ userID })
      .where("status")
      .equals("active");
    res.status(200).json({ message: "Active Following", conection });
  } catch (e) {
    res.status(400).json(e.message);
  }
};



// //GetallPendingFollowing
const GetAllPendingFollowing = async (req, res) => {
  try {
    const userID = req.params.id;
    let conection = await Conection.find({ userID })
      .where("status")
      .equals("pending");
    res.status(200).json({ message: "Pending Following", conection });
  } catch (e) {
    res.status(400).json(e.message);
  }
};



// //GetAllActiveFollow
const GetAllActiveFollow = async (req, res) => {
  try {
    const followersID = req.params.id;
    let conection = await Conection.find({ followersID })
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
const GetAllPendingFollow = async (req, res) => {
  try {
    const followersID = req.params.id;
    let conection = await Conection.find({ followersID })
      .where("status")
      .equals("pending");
    res
      .status(200)
      .json({
        message: "All Pending Fellow",
        conection: conection,
        status: true,
      });
  } catch (e) {
    res.status(400).json(e.message);
  }
};



// //Unfollow--
const Unfollow = async (req, res) => {
  try {
    const id = req.params.id;
    let conection = await Conection.deleteOne({ _id: id });
    res.status(200).json( {message:"Request Has been Deleted",conection});
  } catch (e) {
    res.status(400).json(e.message);
  }
};




// //AcceptFollowingRequest---
const AcceptFollowingRequest = async (req, res) => {
  try {
    const id = req.params.id;
    let conection = await Conection.findOneAndUpdate(
      { _id: id },
      { status: "active" }
    );

    res.status(200).json( {message:"Accpected Request",conection});
  } catch (e) {
    res.status(400).json(e.message);
  }
};



// const accpectfollowingResquest = async (req,res) => {
//   try {

//     let connection = await Conection.findByIdAndUpdate({_id:id},{status:"active"});
//     res.status(200).json({message:"Accpeted Request",connection})

//   } catch (error) {
//     res.status(400).json(error.message)
    
//   }
// }



module.exports = {
  Follow,
  GetAllActiveFollowing,
  GetAllPendingFollowing,
  GetAllActiveFollow,
  GetAllPendingFollow,
  Unfollow,
  AcceptFollowingRequest,
  // accpectfollowingResquest
};

