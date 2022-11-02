// const MentorOnboard = require('../models/MentorOnboard');

const router = require('express').Router();

const { postMentorOnboard, GetMentorOnboard } = require('../controllers/Mentor_onboard')

router.post('/mentoronboard',postMentorOnboard)

router.get('/getMnetorOnboard', GetMentorOnboard)


module.exports = router;