const con = require('../../../../../../common/database/mysql');
const util = require('util');
const query = util.promisify(con.query).bind(con);
const { databaseInitial } = require('../../../../../../config');
const { connection_failed } = require('../../../../../../common/statusCode');
const { info } = require('console');

class MoodDatabase {
  /**
   * Database call to check if user exists
   * @param {*} req (email address & mobileNumber)
   * @param {*} res (json with success/failure)
   */
  async getMoodByID(id) {
    try {
      const sqlSelectQuery = `SELECT * FROM MOOD WHERE ID = ?`;
      const details = await query(sqlSelectQuery, [
        id
      ]);
      return details;
    } catch (error) {
      throw {
        statusCode: connection_failed,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }

  async getQuestionByMoodID(infoMoodID) {
    try {
      // fetch question_id by mood_id
      const sqlQuery = `SELECT QUESTION_ID FROM que_by_mood WHERE MOOD_ID=?`;
      const questionByMood = await query(sqlQuery, [
        infoMoodID
      ]);

      // fetch questions by question_id
      // const ids = questionByMood.map((q) => q.QUESTION_ID);

      // const sqlSelectQuery = `SELECT * FROM question WHERE ID IN (?)`;
      // const questionIDdetails = await query(sqlSelectQuery, [
      //   ...ids
      // ])

      const questions = [];

      for (const q of questionByMood) {
        const sqlSelectQuery = `SELECT * FROM question WHERE ID = ?`;
        const questionIDdetails = await query(sqlSelectQuery, [
          q.QUESTION_ID
        ]);

        questions.push(questionIDdetails[0]);
      }
      return questions;
    } catch (error) {
      throw {
        statusCode: connection_failed,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }

  async getMoods() {
    try {
      const sqlQuery = `SELECT * FROM MOOD`;
      const details = await query(sqlQuery);
      return details;
    } catch (error) {
      throw {
        statusCode: connection_failed,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }

  // update mood
  async putUpdateMoodById(info) {
    try {
      const sqlQuery = `UPDATE MOOD SET MOOD_NAME='?'  WHERE ID = ?;`;
      const details = await query(sqlQuery, [
        info.MOOD_NAME,
        info.ID
      ]);
      return details;
    } catch (error) {
      throw {
        statusCode: connection_failed,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }

  async getQuestionCheck() {
    try {
      const sqlQuery = `SELECT * FROM QUESTION`;
      const details = await query(sqlQuery);
      return details;
    } catch (error) {
      throw {
        statusCode: connection_failed,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }

  async postNewQuestion(info) {
    try {
      const sqlQuery = `INSERT INTO QUESTION(QUESTION_NAME,OPTION_1,OPTION_2) VALUES (?, ?, ?);`;
      const details = await query(sqlQuery, [
        info.QUESTION_NAME,
        info.OPTION_1,
        info.OPTION_2,
      ]);
      return details;
    } catch (error) {
      throw {
        statusCode: connection_failed,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }


  async postUserAns(info) {
    try {
      // check if already answered
      const sqlSelectQuery = `select * from user_ans where attempt_id = ? and question_id = ?`;
      const alreadyAnswered = await query(sqlSelectQuery, [
        info.attempt_id,
        info.question_id,
      ]);

      if (alreadyAnswered && alreadyAnswered.length > 0) {
        // update with new answer
        const sqlUpdateQuery = `update user_ans set answer = ? where id = ?`;
        const updatedAnswer = await query(sqlUpdateQuery, [
          info.answer,
          alreadyAnswered[0].Id
        ]);
        return updatedAnswer;
      }

      const sqlQuery = `insert into user_ans(answer,attempt_id,question_id)value(?,?,?)`;
      const details = await query(sqlQuery, [
        info.answer,
        info.attempt_id,
        info.question_id,
      ]);
      return details;
    } catch (error) {
      throw {
        statusCode: connection_failed,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }

  async postAttempt(info, user) {
    try {
      // get user 
      const sqlSelectQuery = `SELECT * FROM user WHERE emailAddress = ?`;
      const userDetail = await query(sqlSelectQuery, [user.emailAddress]);

      const sqlQuery = `insert into attempt(user_id ,start_Time,mood_id )value(?,?,?)`;
      const details = await query(sqlQuery, [
        userDetail[0].id,
        new Date(),
        info.mood_id
      ]);
      return details;
    } catch (error) {
      throw {
        statusCode: connection_failed,
        message: error.message,
        data: JSON.stringify(error),
      };
    }
  }

};




module.exports = {
  moodDatabase: function () {
    return new MoodDatabase();
  },
};
