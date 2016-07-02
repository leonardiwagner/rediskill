var Promise = require('bluebird');

module.exports = Queue = function(redis){
  var checkIfKeyExists = function(key){
    return new Promise(function(resolve, reject){
      redis.exists(key, function(err, reply){
        if (err)         return reject(err);
        if (reply === 1) reject("key " + key + " already exists on redis");
        return resolve();
      });
    });
  };

  var setKeyInList = function(listName, key){
    return new Promise(function(resolve, reject){
      redis.rpush(listName, key, function(err, reply) {
        if (err) reject(err);
        resolve(reply);
      });
    });
  };

  var insertKeyValue = function(key, value){
    return new Promise(function(resolve, reject){
      redis.set(key, value, function(err, reply) {
        if (err) reject(err);
        else resolve(reply);
      });
    });
  };

  return {
    sendMessage: function(listName, message){
      return checkIfKeyExists(message.key)
      .then(function(){ return setKeyInList(listName, message.key)})
      .then(function(){ insertKeyValue(message.key, message.value) })
        .catch(function(err){
          console.log("peguei caraio", err)
        })
    }
  }
};