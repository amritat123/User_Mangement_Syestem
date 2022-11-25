const router = require("express").Router();
const express = require("express");


const {
  AttendenceStudentpost,
  getAttendenceOfStuydent,
  // StudentAttendenceEdit,
  // DeleteStudentAttendence,
  CountOfStudentsAttendance,
  CountOfStudentsAttendancePresent,
} = require("../controllers/ViewAttendence");



router.post("/Studenattendence", AttendenceStudentpost);

router.get("/ViewAttendence", getAttendenceOfStuydent);

// router.patch("/editattendence/:id", StudentAttendenceEdit);

// router.delete("/removeattendence/:id", DeleteStudentAttendence);
router.get("/get-total-student-absent",CountOfStudentsAttendance)
router.get("/get-total-student-present",CountOfStudentsAttendancePresent)

module.exports = router;
