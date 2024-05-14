const object = require('./mood');
const functions = require('../../../../common/functions');

const controller = {
  // Get getmoods API
  getMoods: async (req, res, next) => {
    try {
      const moodInformationDetails = await object
        .moodService()
        .getMoods();
      res.send(
        functions.responseGenerator(
          moodInformationDetails.statusCode,
          moodInformationDetails.message,
          moodInformationDetails.data
        )
      );
    } catch (error) {
      return next(error);
    }
  },
  getMoodByID: async (req, res, next) => {
    try {
      const moodInformationDetails = await object
        .moodService()
        .getMoodByID(req.params.id);
      res.send(
        functions.responseGenerator(
          moodInformationDetails.statusCode,
          moodInformationDetails.message,
          moodInformationDetails.data
        )
      );
    } catch (error) {
      return next(error);
    }
  },



  // Update  API
  putUpdateMoodById: async (req, res, next) => {
    try {
      const updateMoodDetails = await object
        .moodService()
        .putUpdateMoodById(req.body);
      res.send(
        functions.responseGenerator(
          updateMoodDetails.statusCode,
          updateMoodDetails.message,
          updateMoodDetails.data
        )
      );
    } catch (error) {
      return next(error);
    }
  },


  // question_id by mood_id 

  getQuestionByMoodID: async (req, res, next) => {
    try {
      const QuestionByMoodID = await object
        .moodService()
        .getQuestionByMoodID(req.params.moodId);
      res.send(
        functions.responseGenerator(
          QuestionByMoodID.statusCode,
          QuestionByMoodID.message,
          QuestionByMoodID.data
        )
      );
    } catch (error) {
      return next(error);
    }
  },




  // getQuestionByMoodID:

  getQuestionCheck: async (req, res, next) => {
    try {
      const checkMoodQuestion = await object
        .moodService()
        .getQuestionCheck();
      res.send(
        functions.responseGenerator(
          checkMoodQuestion.statusCode,
          checkMoodQuestion.message,
          checkMoodQuestion.data
        )
      );
    } catch (error) {
      return next(error);
    }
  },
  postNewQuestion: async (req, res, next) => {
    try {
      const newQuestion = await object
        .moodService()
        .postNewQuestion(req.body);
      res.send(
        functions.responseGenerator(
          newQuestion.statusCode,
          newQuestion.message,
          newQuestion.data
        )
      );
    } catch (error) {
      return next(error);
    }
  },




  postUserAns: async (req, res, next) => {
    try {
      const userAns = await object
        .moodService()
        .postUserAns(req.body, res.locals.tokenInfo);
      res.send(
        functions.responseGenerator(
          userAns.statusCode,
          userAns.message,
          userAns.data
        )
      );
    } catch (error) {
      return next(error);
    }
  },

  postAttempt: async (req, res, next) => {
    try {
      const attempt = await object
        .moodService()
        .postAttempt(req.body, res.locals.tokenInfo);
      res.send(
        functions.responseGenerator(
          attempt.statusCode,
          attempt.message,
          attempt.data
        )
      );
    } catch (error) {
      return next(error);
    }
  },

  // Add profile picture
  profilePic: async (req, res, next) => {
    try {
      const profilePicDetails = await object
        .userService()
        .addProfilePic(
          res.locals.tokenInfo.emailAddress,
          res.locals.requestedData
        );
      res.send(
        functions.responseGenerator(
          profilePicDetails.statusCode,
          profilePicDetails.message,
          profilePicDetails.data
        )
      );
    } catch (error) {
      return next(error);
    }
  }

};

module.exports = controller;
