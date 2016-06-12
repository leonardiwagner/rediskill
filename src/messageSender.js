var Promise = require('bluebird');

module.exports = function(redis, queueName){
  var keyAlreadyExists = function(key) {
    return new Promise(function(resolve, reject){
      redis.exists(key, function(err, reply){
        if (err)         return reject(err);
        if (reply === 1) return reject('rediskill: key ' + key + ' already exists on queue');
        return resolve();
      });
    });
  };

  var setKeyIntoQueue = function(queueName, key) {
    return new Promise(function(resolve, reject) {
      redis.rpush(queueName, key, function(err, reply) {
        if (err) reject(err);
        resolve(reply);
      });
    });
  };

  var insertOnRedis = function(key, value){
    return new Promise(function(resolve, reject){
      redis.set(key, value, function(err, reply) {
        if (err) reject(err);
        else resolve(reply);
      });
    });
  };

  return {
    send: function(key, value){
      return keyAlreadyExists(key)
        .then(insertOnRedis(key, value))
        .then(setKeyIntoQueue(queueName, value))
    }
  };
};
