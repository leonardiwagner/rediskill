var createQueue = function(queueName){

};

var deleteQueue = function(queueName){

};

var receiveMessage = function(callback){

};

var sendMessage = function(message, callback){

};


var redisKill = require('./rediskill').connect('0.0.0.0');
var queue = redisKill.createQueue('queue');