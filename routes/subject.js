const router = require('express').Router();

const { DeleteSubjects, UpdateSubejcts, SearchAnySubject, AddAnySubject, GetAllSubject } = require('../controllers/Subjects');


// router.post('/addsuject', BulkAddSubject)

router.get('/AllSubject',GetAllSubject)

router.delete('/deletesubject/:id',DeleteSubjects)

router.patch('/editsubject/:id',UpdateSubejcts)

router.get('/serachsubject',SearchAnySubject)

router.post('/addsubject',AddAnySubject)

module.exports = router;