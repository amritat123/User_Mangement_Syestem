
const jwt = require("jsonwebtoken");
const JWTkey = process.env.TOKEN_KEY;
// const dotenv = require(')
require("dotenv").config()


// module.exports.generateJwtToken = (user) => {
//   return jwt.sign({ user }, JWTkey, {
//     expiresIn: "7d",
//   });
// };

module.exports.isAuthenticated = (req, res, next) => {
  if (req.headers.authtoken) {
    console.log("entered authorization");
    const token = req.headers.authtoken;
    // console.log(token,"token")
    console.log(process.env.TOKEN_KEY,"JWTkey")

    if (token == "")
      res.status(401).json({ message: "Authorization required" });
    const user = jwt.verify(token, process.env.TOKEN_KEY);
    if (!user) res.status(401).json({ message: "Authorization required" });
    req.user = user.user._id;
    // console.log(user, "effe");
    return next();

  } else {
    return res.status(401).json({ message: "Authorization required" });
  }
};

