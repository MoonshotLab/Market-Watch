var path = require('path');
var express = require('express');
var http = require('http');
var needle = require('needle');
var spark = require('./libs/spark');
var dj = require('./libs/dow-jones');

var app = express();
var server = http.Server(app);
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
spark.connect();
dj.poll();


app.get('/notify-spark', function(req, res){
  var params = req.query.directive + ',' + req.query.color;
  spark.notify(params);

  if(req.query.directive == '1'){
    setTimeout(function(){
      spark.notify('0, blue');
    }, 3000);
  }

  res.send({ ok: true });
});

server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});
