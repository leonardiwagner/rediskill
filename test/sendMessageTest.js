var should = require('chai').should();
var testHelper = require('./testHelper')

var rediskill = require('../src/rediskill');
var queue = rediskill.connectToRedisAndUseItAsQueue('redis', 6379)

describe('send message tests', function() {
  this.timeout(5000);

  beforeEach(function(done){
    testHelper.flushRedis(queue.getRedisConnection(), done)
  });

  it('should send message', function(done) {
    var message = new rediskill.Message('someKey', 'someValue')
    queue.sendMessage(message).then(done);
  });

  it('should throw error when key already exists on queue', function(done) {
    var message = new rediskill.Message('someKey', 'someValue')
    var message2 = new rediskill.Message('someKey', 'someValue2')

    queue.sendMessage(message)
      .then(queue.sendMessage(message2))
      .then(done)
      .catch(function(e){
        console.log('ie', e);
      })
  });
});