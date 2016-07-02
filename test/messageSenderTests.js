var testHelper = require('./testHelper');
var should = require('chai').should();

var MessageSender = require('../src/messageSender');
var Message = require('../src/message');

describe.only('Message Sender Tests', function(){
  beforeEach(function(done){
    testHelper.flushRedis(done)
  });

  it('should send message', function(done){
    testHelper.getConnection().then(function(redis){
      var messageSender = new MessageSender(redis);

      messageSender.sendMessage('somelist', new Message(1, 'some value'))
      .then(function() {
        redis.llen('somelist', function (err, length) {
          length.should.equals(1);
          done();
        });
      });
    });
  });

  it('should send two messages', function(done){
    testHelper.getConnection().then(function(redis){
      var messageSender = new MessageSender(redis);

      messageSender.sendMessage('somelist', new Message(1, 'some value'))
      .then(messageSender.sendMessage('somelist', new Message(2, 'some value')))
      .then(function() {
        redis.llen('somelist', function (err, length) {
          length.should.equals(2);
          done();
        });
      });
    });
  });

  it.only('should fail sending two messages with same key', function(done){
    testHelper.getConnection().then(function(redis){
      var messageSender = new MessageSender(redis);

      messageSender.sendMessage('somelist', new Message(1, 'some value'))
        .then(messageSender.sendMessage('somelist', new Message(1, 'some value')))
        .then(function() {
          redis.llen('somelist', function (err, length) {
            length.should.equals(1);
            done();
          });
        })
        .catch(function(err){
          console.log(err);
        })

    });
  });




});