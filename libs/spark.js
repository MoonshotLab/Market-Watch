var spark = require('sparknode');
var core = null;


var connect = function(){
  core = new spark.Core({
    accessToken: process.env.SPARK_TOKEN,
    id: process.env.SPARK_ID
  });

  core.on('connect', function(e){
    if(e.connected === false) connect();
    else
      console.log('Spark Connected:', e);
  });

  core.on('error', function(e){
    console.log(e);
  });
};


var notify = function(params, next){
  try{
    core.notify(params, function(err, data){
      if(err) console.log(err);
      if(next) next(err, data);
    });
  } catch(e){
    connect();
    console.log(e);
  }
};


exports.connect = connect;
exports.notify = notify;
