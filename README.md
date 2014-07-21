# Market Watch
A web service which polls the Dow Jones for changes in the DJI index. When a change is noticed, the service will notify a [Spark](http://spark.io) based wrist watch which in turn alerts a user.

A small companion web page allows you to simulate different effects.

# Environment Variables
* `SPARK_ID` - The id of the Spark core.
* `SPARK_TOKEN` - The access token for the Spark core.
