# Market Watch
A web service which polls the Dow Jones for changes in the DJI index. When a change is noticed, the service will notify a [Spark](http://spark.io) based wrist watch which in turn alerts a user.

A small companion web page allows you to simulate different effects.

## Watch States
* Breathe Green - DJI above starting point
* Breathe Red - DJI below starting point
* Blink Blue - Markets in low volatility
* Blink Yellow - Markets in high volatility
* Blink Red - Trading Over

## Notifying the Spark
Notify the spark by passing params in the form `1,0,green`.

* The first param is the state. `1` will cause it to blink while `0` will breathe.
* The second param is the vibration directive. `1` will trigger a vibrate on notification, `0` will not.
* The last param is the color and accepts `green`, `red`, `white`, `blue`, `red`, or `yellow`.

## Environment Variables
* `SPARK_ID` - The id of the Spark core.
* `SPARK_TOKEN` - The access token for the Spark core.
