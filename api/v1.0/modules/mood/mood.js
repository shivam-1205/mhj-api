const functions = require('../../../../common/functions');
const config = require('../../../../config');
const validator = require('validator');
const statusCode = require('../../../../common/statusCode');
const message = require('../../../../common/message');
const fs = require('fs');
const db = require(`./database/mysql/mysql`);

class MoodService {

  /**
   * API for user history
   * @param {*} req (userId)
   * @param {*} res (json with success/failure)
   */
  async getMoods() {
    try {
      const moods = await db.moodDatabase().getMoods();

      return {
        statusCode: statusCode.success,
        message: message.success,
        data: moods,
      };

    } catch (error) {
      throw {
        statusCode: error.statusCode,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }


  /**
 * API for user history
 * @param {*} req (userId)
 * @param {*} res (json with success/failure)
 */
  async getMoodByID(id) {
    try {
      const mood = await db.moodDatabase().getMoodByID(id);

      return {
        statusCode: statusCode.success,
        message: message.success,
        data: mood,
      };

    } catch (error) {
      throw {
        statusCode: error.statusCode,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }
  /**
   * API to update mood
   * @param {*} req (token, user information )
   * @param {*} res (json with success/failure)
   */
  async putUpdateMoodById(info) {
    try {
      const mood = await db.moodDatabase().putUpdateMoodById(info);

      return {
        statusCode: statusCode.success,
        message: message.success,
        data: mood,
      };
    } catch (error) {
      throw {
        statusCode: error.statusCode,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }


  /**
  * question_id by mood_id
  * @param {*} req (token, user information )
  * @param {*} res (json with success/failure)
  */
  async getQuestionByMoodID(moodId) {
    try {
      const mood = await db.moodDatabase().getQuestionByMoodID(moodId);

      return {
        statusCode: statusCode.success,
        message: message.success,
        data: mood,
      };
    } catch (error) {
      throw {
        statusCode: error.statusCode,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }




  async getQuestionCheck() {
    try {
      const MoodQuestion = await db.moodDatabase().getQuestionCheck()
      return {
        statusCode: statusCode.success,
        message: message.success,
        data: MoodQuestion,
      };
    } catch (error) {
      throw {
        statusCode: error.statusCode,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }
  async postNewQuestion(info) {
    try {
      const newQuestion = await db.moodDatabase().postNewQuestion(info)
      return {
        statusCode: statusCode.success,
        message: message.success,
        data: newQuestion,
      };
    } catch (error) {
      throw {
        statusCode: error.statusCode,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }
  async postUserAns(info, user) {
    try {
      const userAns = await db.moodDatabase().postUserAns(info, user.id)
      return {
        statusCode: statusCode.success,
        message: message.success,
        data: userAns,
      };
    } catch (error) {
      throw {
        statusCode: error.statusCode,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }
  async postAttempt(info, user) {
    try {
      const userAns = await db.moodDatabase().postAttempt(info, user)
      return {
        statusCode: statusCode.success,
        message: message.success,
        data: userAns,
      };
    } catch (error) {
      throw {
        statusCode: error.statusCode,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }



}

module.exports = {
  moodService: function () {
    return new MoodService();
  },
};
