const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const course = require('./routes/CourseType')
const mentorOnboard = require('./routes/MentorOnboard')
const MentorProfiles = require('./routes/MentorProfile')
const AnySubject = require('./routes/subject');
const ListStudent = require('./routes/student')
const Mentor = require('./models/mentor')

// const User = require("./models/User");
const Message = require("./models/message");
const { request } = require('http');

const rooms = ["general", "Our-team", "College-Fridens", "News"];
require('dotenv').config();


app.use(cors());
app.use(express.json());

// 
const PORT = process.env.PORT || 5000
const DB_URI = process.env.DB_URI


app.use('/', require('./routes/Mentor'));
app.use('/Course', course)
app.use('/Onboard', mentorOnboard)
app.use('/profiles', MentorProfiles)
app.use('/Subject', AnySubject)
app.use('/student',ListStudent)


const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})


//get the all messgae
async function getLastMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);

  return roomMessages;
}


//Room,, as a chat..

function sortRoomMessagesByDate(messages) {
  return messages.sort(function (a, b) {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}


io.on("connection", (socket) => {
  socket.on("new-user", async () => {
    const members = await Mentor.find();
    io.emit("new-user", members);
  });


  socket.on("join-room", async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });



  //
  socket.on("message-room", async (room, content, sender, time, date) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      time,
      date,
      to: room,
    });
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    // sending message to room
    io.to(room).emit("room-messages", roomMessages);
    socket.broadcast.emit("notifications", room);
  });

 
});


app.get("/rooms", (req, res) => {
  res.json(rooms);
});

app.get("/members", async (req, res) => {
  try {
    const members = await User.find();
    res.json(members);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});



const Main = async () => {
  try {
    await mongoose.connect(DB_URI);


    server.listen(PORT, () => {
      console.log("listening to port", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

Main();
