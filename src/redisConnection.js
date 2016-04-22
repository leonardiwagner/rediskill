var DEFAULT_REDIS_PORT = 6379;

module.exports = function(host, port){
  port = port || DEFAULT_REDIS_PORT;

  var redis = require('redis').createClient({'host': host, 'port': port})
  redis.on('error', function(err) {
    console.error('rediskill: Error connecting to redis', err);
  });
  
  return redis;
};
