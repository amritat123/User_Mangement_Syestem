const { postCourseType, GetAllCouresType } = require('../controllers/CourseType');

const router = require('express').Router();


router.post('/courestype', postCourseType );
router.get('/getAllCoures',GetAllCouresType)

module.exports = router;