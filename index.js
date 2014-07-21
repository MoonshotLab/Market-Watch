var path = require('path');
var express = require('express');
var spark = require('sparknode');
var http = require('http');
var needle = require('needle');

var app = express();
var server = http.Server(app);
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

var core = new spark.Core({
  accessToken: process.env.SPARK_TOKEN,
  id: process.env.SPARK_ID
});

core.on('connect', function(e){
  console.log('Spark Connected:', e);
});

app.get('/notify-spark', function(req, res){
  var params = req.query.directive + ',' + req.query.color;
  core.notify(params, function(err, data){
    if(err) console.log(err);
  });

  res.send({ ok:true });
});

server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});



var djURL = 'http://betawebapi.dowjones.com/fintech/data/api/v1/quotes/dji';
var getDowJones = function(){
  console.log('checking dow jones...');
  needle.get(djURL, function(error, response, body){
    if (!error && response.statusCode == 200){
      var price = null;
      try{ price = body.CompositeTrading.Last.Price.Value; }
      catch(err){ console.log(err); }

      if(price) priceUpdate(price);
    }
  });
};


var lastPrice = 0;
var priceUpdate = function(price){
  console.log('comparing price...', price, 'vs', lastPrice);

  var params = null;
  if(price > lastPrice)
    params = '1,green';
  else if(price < lastPrice)
    params = '1,red';

  lastPrice = price;

  if(params){
    core.notify(params, function(err, data){
      if(err) console.log(err);
    });

    setTimeout(function(){
      core.notify('0,blue', function(err, data){
        if(err) console.log(err);
      });
    }, 3000);
  }
};


setInterval(getDowJones, 5000);
