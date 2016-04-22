var Promise = require('bluebird');

module.exports = function(redis, queueName){
  var getFromRedisList = function(){
    return new Promise(function(resolve, reject){
      redis.lpop(queueName, function(err, key){
        if (err) reject(err);
        if (key === null) reject('rediskill: there is no message on queue ' + queueName + ' to receive');
        resolve(key);
      });
    });
  };

  return {
    receive: getFromRedisList
  };
};
