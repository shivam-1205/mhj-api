const router = require('express').Router();
const api = require('./controller');
const auth = require('../../../../common/authentication');

// Middle layer for Mood API

router.get('/', auth.validateToken, api.getMoods);

router.get('/questions', auth.validateToken, api.getQuestionCheck);

router.get('/:id', auth.validateToken, api.getMoodByID);

router.put('/updateMood', auth.validateToken, api.putUpdateMoodById);

router.post('/NewQuestion', auth.validateToken, api.postNewQuestion);

router.get('/:moodId/questions', auth.validateToken, api.getQuestionByMoodID);

router.post('/user-ans', auth.validateToken, api.postUserAns);

router.post('/attempt', auth.validateToken, api.postAttempt);


module.exports = router;
