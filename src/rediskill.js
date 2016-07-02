var redisConnection = require('./redisConnection');
var queueSystem = require('./queueSystem');


var connectToRedis = function(host, port){
  return redisConnection.connect(host, port).then(function(redisClient){
    return {
      createQueue: createQueue
    };
  }).catch(function(error){
    throw "rediskill: can't connect to redis on " + host + " " + JSON.stringify(error);
  });
};

module.exports = {
  connectToRedis: connectToRedis
}
