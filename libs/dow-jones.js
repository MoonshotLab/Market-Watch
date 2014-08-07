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

  var marketState = null;
  var color = null;

  if(currentPrice > openingPrice){
    marketState = 'high';
    color = 'green';
  } else if(currentPrice < openingPrice){
    marketState = 'low';
    color = 'red';
  }

  if(color){
    var vibrate = '0';
    if(marketState != lastMarketState) vibrate = '1';

    params = '0,' + vibrate + ',' + color;
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
