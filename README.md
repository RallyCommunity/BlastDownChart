# Blast Down Chart

A "chart" using PI and UserStory data pulled from the Lookback API, visualized as an old school video game.
  
Extremely young at this point. More to come.

# To build and run

You will need the JS version of Cocos2D (homepage [here](http://cocos2d-javascript.org/))

1. Install nodejs and npm
2. run `npm install -g cocos2d@0.2.0-beta3`
3. navigate to where you downloaded BlastDownChart
4. From its root, run `cocos server`
5. open up http://localhost:4000

# How to run the unit tests

Sadly, cocos2d-js is not very unit test friendly. But a minor hack seems to get it working, we'll see how this works out...

1. install jasmine-node: `npm install -g jasmine-node`
2. `export NODE_PATH=/usr/local/lib/node_modules/cocos2d/lib:/usr/local/lib/node_modules/cocos2d/src/libs`
	* it's possible this needs to be tweaked on your machine, but should be fine in OSX
3. head to [BlastDownChartRoot]/specs
4. run `jasmine-node .`

Components in BDC that heavily use visuals and parts of cocos2d will probably prove to be hard to test, have to see how worthwhile this ends up being.

## Writing new tests

They need to end in `.spec.js` and you will need to `require` what you're testing using a relative path into BDC's src directory, example:

    var ScriptRunner = require('../../src/scripting/ScriptRunner');


