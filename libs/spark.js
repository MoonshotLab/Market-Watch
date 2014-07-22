var spark = require('sparknode');

var core = new spark.Core({
  accessToken: process.env.SPARK_TOKEN,
  id: process.env.SPARK_ID
});


core.on('error', function(e){
  console.log(e);
});


var connect = function(){
  core.on('connect', function(e){
    console.log('Spark Connected:', e);
  });
};


var notify = function(params, next){
  core.notify(params, function(err, data){
    if(err) console.log(err);
    if(next) next(data);
  });
};


exports.connect = connect;
exports.notify = notify;
