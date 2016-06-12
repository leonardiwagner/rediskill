var Promise = require('bluebird');
var DEFAULT_REDIS_PORT = 6379;

module.exports = function(host, port){
  port = port || DEFAULT_REDIS_PORT;

  var redis = require('redis');
  //Promise.promisifyAll(redis.RedisClient.prototype);
  //Promise.promisifyAll(redis.RedisClient.prototype);
  //Promise.promisifyAll(redis.Multi.prototype);

  
  var redisClient = redis.createClient({'host': host, 'port': port})
  redisClient.on('error', function(err) {
    console.error('rediskill: Error connecting to redis', err);
  });

  return redisClient;
};
