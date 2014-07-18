var path = require('path');
var express = require('express');
var http = require('http');

var app = express();
var server = http.Server(app);
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.send({ok:true});
});

server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});
