var path = require('path');
var express = require('express');
var spark = require('sparknode');
var http = require('http');

var app = express();
var server = http.Server(app);
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

var core = new spark.Core({
  accessToken: process.env.SPARK_TOKEN,
  id: process.env.SPARK_ID
});

core.on('connect', function(e){
  console.log(e);
  console.log('connected');
});

app.get('/notify-spark', function(req, res){
  var params = req.query.directive + ',' + req.query.color;
  core.notify(params, function(err, data){
    if(err) console.log(err);
    console.log(data);
  });

  res.send({ ok:true });
});

server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});
