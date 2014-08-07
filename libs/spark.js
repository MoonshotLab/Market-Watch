var needle = require('needle');

var notify = function(params, next){
  var url = [
    'https://api.spark.io/v1/devices',
    process.env.SPARK_ID,
    'notify'
  ].join('/');

  var postOpts = {
    access_token: process.env.SPARK_TOKEN,
    params: params
  };

  needle.post(url, postOpts, {timeout: 5000}, function(err, res, body){
    next(err, body);
  });
};


exports.notify = notify;
