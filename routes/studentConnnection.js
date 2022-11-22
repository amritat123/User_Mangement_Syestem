const router = require('express').Router();
const express = require("express");
const { StudentsFollow, GetAllActiveFollowingStudents, GetAllPendingFollowingStudents, GetAllActiveFollowStudents } = require('../controllers/StudentConnection');



router.post('/follow',StudentsFollow)
router.get('/active-follwing/:id',GetAllActiveFollowingStudents)
router.get('/pending-following-students/:id',GetAllPendingFollowingStudents)
router.get('/active-following-students/:id',GetAllActiveFollowingStudents);
router.get('/active-follow-student/:id',GetAllActiveFollowStudents)
router.get('/pending-follow-students/:id',GetAllPendingFollowingStudents)






// router.get('/pendingfollowing/:id',GetAllPendingFollowing)
// router.delete('/unfollow/:id',Unfollow)
// router.patch('/acceptfollowing/:id',AcceptFollowingRequest)


// router.get('/acceptfollowing/:id', Conection.AcceptFollowingRequest)
// router.get('/acceptfollowing/:id', Conection.AcceptFollowingRequest)


module.exports = router;
