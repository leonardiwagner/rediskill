module.exports = {
  flushRedis: function(redisConnection, done){
    redisConnection.flushall(function(err, reply) {
      if (err) console.log(err);
      else done();
    });
  }
}
