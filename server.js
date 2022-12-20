const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user")

require("dotenv").config();

app.use(cors());
app.use(express.json());

//
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

app.use("/", require("./routes/user"));


async function createAdmin() {
  let a = {
    Name: "Admin",
    Email: "admin@gmail.com",
    profile_photo: "",
    password: "admin@123",
    active: true,
    role: "admin",
    otp: 0000000000
  }
  let existing = await User.findOne({ Email: "admin@gmail.com" })
  if (!existing) {
    await User.create(a)
  }
}

const Main = async () => {
  try {
    await mongoose.connect(DB_URI);


    app.listen(PORT, () => {
      console.log("listening to port", PORT);
      createAdmin();
    });
  } catch (error) {
    console.log(error);
  }
};
Main();
