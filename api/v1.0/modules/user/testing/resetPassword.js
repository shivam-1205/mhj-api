const mocha = require('mocha');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const user = require('../user');
const app = require('../../../app');
const should = chai.should();
const message = require('../../common/message');

describe('User Module', () => {
  describe('"Reset Password functionality"', () => {
    //Checking whether the functionality is being export
    it('should export a function', () => {
      expect(user.userService().resetPassword).to.be.a('function');
    });

    it('should return a promise', () => {
      const checkPromise = user.userService().resetPassword();
      expect(checkPromise.then).to.be.a('function');
      expect(checkPromise.catch).to.be.a('function');
    });

    it('should return a failure', async () => {
      const info = {
        emailAddress: 'sddsdfsdfasdfsdfasdfadsfadas',
        newPassword: '',
      };
      const resetPassword = await user.userService().resetPassword(info);
      console.log('Error: ', resetPassword.message);
      if (resetPassword.message === message.invalidEmail) {
        expect(resetPassword.statusCode).to.be.equal('01');
      } else {
        expect(resetPassword.statusCode).to.be.equal('04');
      }
    });

    // it('should return a success', async () => {
    //   const info = {
    //     emailAddress: 'shaikh.muddassar8@gmail.com'
    //   };
    //   const forgotPassword = await user.userService().forgotPassword(info);
    //   console.log('Success: ', forgotPassword.message);
    //   expect(forgotPassword.statusCode).to.be.equal('00');
    // });
  });
});
