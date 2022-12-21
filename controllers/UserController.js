const { encrypt, compare } = require('../services/crypto');
const { sendMail } = require('../services/MAIL');
const User = require('../models/user');

const jwt = require("jsonwebtoken");
const JWTkey = process.env.TOKEN_KEY;
// const dotenv = require(')
require("dotenv")


const generateJwtToken = (user) => {
  return jwt.sign({ user }, JWTkey, {
    expiresIn: "7d",
  });
};

//  signup-----
const signUp = async (req, res) => {
  try {
    const { Name, Email, password } = req.body;

    console.log(req.file)
    const path = req.file.originalname;

    if (!path) throw new Error('no  images file')

    console.log(path);


    let Existing = await User.findOne({ Email })


    if (Existing) return res.status(400).json({
      message: 'Already existing'
    });

    const hashedPassword = await encrypt(password);
    const otpGenerated = Math.floor(100000 + Math.random() * 900000)

    // if not existing than create new user....
    let newUser = await User.create({
      Name,
      Email,
      profile_photo: path,
      password: hashedPassword,
      otp: otpGenerated,
    });
    //  if unable to create new user than send mail and genrate an otp.
    if (!newUser) return res.status(400).json({
      message: 'Unable to create new user',
    });

    let mail = await sendMail({
      to: Email,
      OTP: otpGenerated,
    });

    return res.status(200).json({
      newUser,
      message: 'User Created',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

};



//login ------
const login = async (req, res) => {

  try {
    const { Email, password } = req.body;

    if (!(Email && password)) return res.status(400).json({ message: "All input is required" });


    let Existing = await User.findOne({ Email, active: true })

    if (!Existing) return res.status(400).json({ message: 'No User existing' });

    if (Existing && (await compare(password, Existing.password))) {

      // yaha pe token ka add karna h
      let token = generateJwtToken(Existing)

      res.status(200).json({ user: Existing, token });
    }
    res.status(400).json({ message: "Invalid Credentials" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

// Verify
const verify_OTP = async (req, res) => {
  try {
    const { Email, otp } = req.body;

    let Existing = await User.findOne({ Email })

    if (!Existing) return res.status(400).json({ message: 'User not found' });

    if (Existing && Existing.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    const updatedUser = await User.findByIdAndUpdate(Existing._id, { $set: { active: true } });

    let token = generateJwtToken(Existing)

    res.status(200).json({ user: updatedUser, token });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

};

const DeleteUser = async (req, res) => {
  try {
    const _id = req.params.id;

    let Existing = await User.findOneAndDelete({ _id })

    res.status(200).json({ Existing });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

};


const ChangeStatus = async (req, res) => {
  try {
    const { Email, status } = req.body;

    let Existing = await User.findOne({ Email })
    if (!Existing) return res.status(400).json({ message: 'User not found' });
    const updatedUser = await User.findByIdAndUpdate(Existing._id, { $set: { active: status } });
    let user = await User.findOne({ Email })

    res.status(200).json({ user });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

};

const GetUser = async (req, res) => {
  try {
    const getresponce = await User.find()
    res.status(200).json({ message: "User Details", data: getresponce, status: true })

  } catch (error) {
    res.status(403).json({ message: error.message })

  }
}

//Update usre
const EditUserDetails = async (req, res) => {
  try {
    const { Name, Email, password } = req.body;

    console.log(req.file)
    const path = req.file.originalname;

    if (!path) throw new Error('no  images file')

    console.log(path)

    const getresponce = await User.findOneAndUpdate({ _id: req.params.id },
      { Name, Email, password, profile_photo: path })

    res.status(200).json({ message: "User Details Updated Successfully", data: getresponce, status: true })

  } catch (error) {
    res.status(403).json({ message: error.message })
  }
}

module.exports = {
  verify_OTP,
  login,
  signUp,
  DeleteUser,
  ChangeStatus,
  GetUser,
  EditUserDetails


}