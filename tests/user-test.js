//user-test.js
var chai = require('chai');
var expect = chai.expect;
var should = require('should')
var User = require('../user/User');
var UserController = require('../user/UserController');
var server = require('../server');


describe('User', function() {
    var username = Math.random() * Date.now();
    var email = username + "@" + username + ".com";

  it('should create a User if all information are valid', (done) => {

    var request = require("request");

    var options = { method: 'POST',
      url: 'http://localhost:3000/user',
      headers: 
      { 'postman-token': 'bf99aab6-0d56-3c35-0db2-8fd12d9de3f8',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded' },
      form: 
      { username: username,
        password: 'teste',
        email: email } };

    request(options, function (error, res, body) {
      if (error) throw new Error(error);

      var jBody = JSON.parse(body);

      res.statusCode.should.equal(200);
      jBody.user.username.should.equal(username.toString());
      jBody.user.email.should.equal(email);                    
      jBody.user.should.have.property('_id');
      jBody.user.should.have.property('username');
      jBody.user.should.have.property('email');
      jBody.user.should.have.property('password');

			done();
    });
  });

  it('should NOT create a User with same email', (done) => {

    var request = require("request");

    var options = { method: 'POST',
      url: 'http://localhost:3000/user',
      headers: 
      { 'postman-token': 'bf99aab6-0d56-3c35-0db2-8fd12d9de3f8',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded' },
      form: 
      { username: username + "teste",
        password: 'teste',
        email: email } };

    request(options, function (error, res, body) {
      if (error) throw new Error(error);

      var jBody = JSON.parse(body);

      res.statusCode.should.equal(403);
      jBody.success.should.be.equal(false);

			done();
    });
  });

  it('should NOT create a User with same username', (done) => {

    var request = require("request");

    var options = { method: 'POST',
      url: 'http://localhost:3000/user',
      headers: 
      { 'postman-token': 'bf99aab6-0d56-3c35-0db2-8fd12d9de3f8',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded' },
      form: 
      { username: username,
        password: 'teste',
        email: email  + "teste"} };

    request(options, function (error, res, body) {
      if (error) throw new Error(error);

      var jBody = JSON.parse(body);

      res.statusCode.should.equal(403);
      jBody.success.should.be.equal(false);

			done();
    });
  });

  it('should UPDATE a User correctly', (done) => {

    var request = require("request");

    var options = { method: 'POST',
      url: 'http://localhost:3000/user',
      headers: 
      { 'postman-token': 'bf99aab6-0d56-3c35-0db2-8fd12d9de3f8',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded' },
      form: 
      { username: username,
        password: 'teste',
        email: email} };

    request(options, function (error, res, body) {
      if (error) throw new Error(error);

      var jBody = JSON.parse(body);

      res.statusCode.should.equal(403);
      jBody.success.should.be.equal(false);

			done();
    });
  });


  after(function () {
    server.close();
  });

});
