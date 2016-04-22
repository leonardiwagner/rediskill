var redisConnection = require('./redisConnection');

var rediskill = function(host, port){
  var QUEUE_NAME = 'rediskill';
  var connection = redisConnection(host, port);
  var messageSender = require('./messageSender')(connection, QUEUE_NAME);
  var messageReceiver = require('./messageReceiver')(connection, QUEUE_NAME);

  return {
    sendMessage: messageSender.send,
    receiveMessage: messageReceiver.receive
  }
};