var express = require('express');
var router = express.Router();

const userRouter = require('./modules/user/routes');
const moodRouter = require('./modules/mood/routes');

router.get('/', function (req, res, next) {
  res.send('Hello v1.0 GET API from Afoofa');
});


router.post('/', function (req, res, next) {
  res.send('Hello v1.0 POST API from Afoofa');
});

router.use('/user', userRouter);
router.use('/mood', moodRouter);

module.exports = router;
