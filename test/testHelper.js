var redisConnection = require('../src/redisConnection');

module.exports = {
  getConnection: function(){
    return redisConnection.connect('redis');
  },
  flushRedis: function(callback){
    redisConnection.connect('redis').then(function(redis){
      redis.flushall(function(err, reply) {
        if (err) console.log(err);
        else callback();
      });
    });
  }
}
