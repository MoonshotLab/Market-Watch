var lastMarketState = null;
var needle = require('needle');
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
  var marketState = null;

  if(currentPrice > openingPrice){
    marketState = 'high';
    params = '0,green';
  } else if(currentPrice < openingPrice){
    marketState = 'low';
    params = '0,red';
  }

  if(params && marketState != lastMarketState){
    spark.notify(params, function(err, data){
      if(err) {
        console.log('Could not notify core', err);
        lastMarketState = null;
      } else {
        lastMarketState = marketState;
        console.log('notified spark');
      }
    });
  }

  setTimeout(getDowJones, 15000);
};


exports.getDowJones = getDowJones;
