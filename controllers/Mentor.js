const { encrypt, compare } = require('../services/crypto');
const { sendMail } = require('../services/MAIL');
const Mentor = require('../models/mentor');
const { generateJwtToken } = require('./middlewares/auth');


const signUp = async (req, res) => {
  try {
    const { first_Name, last_Name, Email, password, confirmPassword } = req.body;

    let Existing = await Mentor.findOne({ Email:Email })


    if (Existing) return res.status(400).json({
      message: 'Already existing'
    });

    if (password !== confirmPassword) return res.status(400).json({
      message: 'Passowrd does not match'
    });

    const hashedPassword = await encrypt(password);
    const otpGenerated = Math.floor(100000 + Math.random() * 900000)


    let newUser = await Mentor.create({
      first_Name,
      last_Name,
      Email,
      password: hashedPassword,
      otp: otpGenerated,
    });

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


    let Existing = await Mentor.findOne({ Email })

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

    let Existing = await Mentor.findOne({ Email })

    if (!Existing) return res.status(400).json({ message: 'User not found' });

    if (Existing && Existing.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    const updatedUser = await Mentor.findByIdAndUpdate(Existing._id, { $set: { active: true } });

    let token = generateJwtToken(Existing)

    res.status(200).json({ user: updatedUser, token });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

};

//Reset Password
const RestPasswordsendOTP = async (req, res) => {
  try {

    const { Email } = req.body;

    // Check if user already exist
    let Existing = await Mentor.findOne({ Email: Email })

    if (!Existing) return res.status(400).json({ message: 'User not found' });


    const otpGenerated = Math.floor(100000 + Math.random() * 900000)

    const updatedUser = await Mentor.findByIdAndUpdate(Existing._id, {
      $set: { otp: otpGenerated },
    });

    if (!updatedUser) return res.status(400).json({ message: 'Unable to Generate otp' });

    let mail = await sendMail({
      to: Email,
      OTP: otpGenerated,
    });
   
    return res.status(200).json({ message: 'Mail Send' });
  } catch (error) {
    return res.send('Unable to Send OTP, Please try again later', error);
  }

};

//.RestPasswordOtp
const RestPasswordOtp = async (req, res) => {
 try {
   const { otp, Email } = req.body;

   let Existing = await Mentor.findOne({ Email })
   if (!Existing) return res.status(400).json({ message: 'User not found' });

   if (Existing.otp == otp) {
     return res.status(200).json({ message: 'Correct OTP' });

   } else {

     return res.status(400).json({ message: 'No User existing' });

   }
 } catch (error) {
   return res.status(500).json({ message: error.message });
   
 }
};

//RestPasswordLink ---
const RestPassword = async (req, res) => {
try {
  const { password, Email } = req.body;

  let Existing = await Mentor.findOne({ Email })
  if (!Existing) return res.status(400).json({ message: 'User not found' });

  const hashedPassword = await encrypt(password);
  const updatedUser = await Mentor.findByIdAndUpdate(Existing._id, {
    $set: { password: hashedPassword },
  });


  if (!updatedUser) {
    return res.status(200).json({ message: 'Password not Updated' });

  } else {

    return res.status(400).json({ message: 'Password Updated' });

  }
} catch (error) {
  return res.status(500).json({ message: error.message });
}

};


module.exports= {

  RestPassword,
  RestPasswordOtp,
  RestPasswordsendOTP,
  verify_OTP,
  login,
  signUp
}