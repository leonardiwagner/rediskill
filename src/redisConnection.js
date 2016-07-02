var Promise = require('bluebird');
var DEFAULT_REDIS_PORT = 6379;

var redis = require('redis');

var connect = function(host, port){
  port = port || DEFAULT_REDIS_PORT;

  return new Promise(function(resolve, reject){
    var redisClient = redis.createClient({'host': host, 'port': port})
    redisClient.on('error', function(error) {
      reject(error);
    });

    setInterval(function(){
      if(redisClient.connected){
        resolve(redisClient);
      }
    }, 1000)
  });
};

module.exports = {
  connect: connect
};
