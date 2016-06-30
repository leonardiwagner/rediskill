
module.exports = function(redisConnection){
  return {
    deleteMessageByKey: deleteMessageByKey,
    deleteMessageBatchByKeys: deleteMessageBatchByKeys,


  }
};