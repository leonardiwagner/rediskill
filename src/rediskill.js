var redisConnection = require('./redisConnection');
var queueSystem = require('./queueSystem');


var connectToRedisAndUseItAsQueue = function(host, port){
  return redisConnection.connect(host, port).then(function(){
    return
  }).catch(function(error){
    throw "rediskill: can't connect to redis on " + host + " " + JSON.stringify(error);
  });
};

module.exports = {
  connectToRedisAndUseItAsQueue: connectToRedisAndUseItAsQueue
}
