const router = require('express').Router();
const express = require("express");
const { Follow, GetAllActiveFollowing, GetAllPendingFollowing, GetAllActiveFollow, GetAllPendingFollow, Unfollow, AcceptFollowingRequest } = require('../controllers/mentorConnection');




// login user
router.post('/follow',Follow)
router.get('/activefollowing/:id',GetAllActiveFollowing)
router.get('/pendingfollowing/:id',GetAllPendingFollowing)
router.get('/activefollow/:id',GetAllActiveFollow)
router.get('/pendingfollow/:id',GetAllPendingFollow)

router.delete('/unfollow/:id',Unfollow)
router.patch('/acceptfollowing/:id',AcceptFollowingRequest)


// router.get('/acceptfollowing/:id', Conection.AcceptFollowingRequest)
// router.get('/acceptfollowing/:id', Conection.AcceptFollowingRequest)


module.exports = router;
