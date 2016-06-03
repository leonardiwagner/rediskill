var redisConnection = require('./redisConnection');

var rediskill = function(host, port){
  var QUEUE_NAME = 'rediskill';
  var connection = redisConnection(host, port);
  var messageSender = require('./messageSender')(connection, QUEUE_NAME);
  var messageReceiver = require('./messageReceiver')(connection, QUEUE_NAME);

  var sendMessages = function(messages){
    var sendMessagesFunctions = messages.map(function(message){
      return messageSender.send(message.key, message.value);
    });

    return Promise.all(sendMessagesFunctions);
  }

  return {
    sendMessage: messageSender.send,
    sendMessages: sendMessages,
    receiveMessage: messageReceiver.receive
  }
};

module.exports = rediskill;
