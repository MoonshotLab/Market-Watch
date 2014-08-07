var path = require('path');
var express = require('express');
var http = require('http');
var spark = require('./libs/spark');
var dj = require('./libs/dow-jones');

var app = express();
var server = http.Server(app);
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
spark.connect();
dj.startPoll();


app.get('/notify-spark', function(req, res){
  var params = req.query.directive + ',' + req.query.color;
  spark.notify(params);

  res.send({ ok: true });
});

server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});
