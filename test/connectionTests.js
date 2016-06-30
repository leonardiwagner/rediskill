var redisConnection = require('../src/redisConnection');

describe('redisConnection tests', function(){
  it('should connect on redis', function(done){
    redisConnection.connect('redis')
      .then(function(){
        done();
      });
  });

  it('should fail connection with wrong connection address', function(done){
    redisConnection.connect('wrong address')
      .then(function(){

      }).catch(function(e){
        done();
      });
  });
});