var spark = require('./spark');
var djURL = 'http://betawebapi.dowjones.com/fintech/data/api/v1/quotes/dji';


var getDowJones = function(){
  console.log('checking dow jones...');

  needle.get(djURL, function(error, response, body){
    if (!error && response.statusCode == 200){
      var currentPrice = null;
      var openingPrice = null;
      try{
        currentPrice = body.CompositeTrading.Last.Price.Value;
        openingPrice = body.CompositeTrading.Open.Value;
      }
      catch(err){ console.log(err); }

      if(currentPrice && openingPrice)
        priceUpdate(openingPrice, currentPrice);
    }
  });
};


var priceUpdate = function(openingPrice, currentPrice){
  console.log('comparing price...', openingPrice, 'vs', currentPrice);

  var params = null;
  if(currentPrice > openingPrice)
    params = '1,white';
  else if(currentPrice < openingPrice)
    params = '1,yellow';

  if(params){
    spark.notify(params, function(err, data){
      if(err) console.log(err);
    });

    setTimeout(function(){
      spark.notify('0,blue', function(err, data){
        if(err) console.log(err);
      });
    }, 3000);
  }
};


var poll = null;
var startPoll = function(){
  poll = setInterval(getDowJones, 60000);
};


var stopPoll = function(){
  clearInterval(poll);
};


exports.startPoll = startPoll;
exports.stopPoll = stopPoll;
