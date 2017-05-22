//token-test.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Token = require('../token');
var User = require('../user/User');

describe('Token', function() {
  it('should return a Token when a user is passed', function() {
    var testUser = new User({username: "teste", password: "teste", email: "teste@teste.com", _id: "asdn39ajsdas9"});
    var tokenData = Token.create(testUser);
    expect(typeof(tokenData) != "undefined");
  });

  it('should be able to open a previous generated token', function() {
    var testUser = new User({username: "teste", password: "teste", email: "teste@teste.com", _id: "asdn39ajsdas9"});
    var tokenData = Token.create(testUser);
    var mockReq = {'x-access-token': tokenData};
    var result =  true;
    
    try{
      Token.verify(tokenData);
    }catch(err){
      result = false;
    }

    expect(result);
  });

  it('should alarm in case of invalid token', function() {
    var tokenData = 'alsjdhfçaklsjdnfçalshdfçkajsdçflakhsdçfkljasdçfansdçflghaskdgasd,g';
    var result =  false;
    
    try{
      Token.verify(tokenData);
    }catch(err){
      result = true;
    }

    expect(result);
  });
});

