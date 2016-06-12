var Promise = require('bluebird');

var redisConnection = require('./redisConnection');
var Message = require('./message')

var sendMessages = function(){
  
}

module.exports = {
  connectToRedisAndUseItAsQueue: function(host, port){
    var connection = redisConnection(host, port);
    var QUEUE_NAME = 'RediskillQueue';

    var messageSender = require('./messageSender')(connection, QUEUE_NAME);
    var messageReceiver = require('./messageReceiver')(connection, QUEUE_NAME);

    return {
      getRedisConnection: function(){
        return connection;
      },
      sendMessage: function(message){
        return messageSender.send(message.key, message.value)
      },
      receiveMessage: messageReceiver.receive
    }
  },
  Message: function(key, value){
    return new Message(key, value)
  }
}
