var cocos = require('cocos2d');
var events = require('events');
var geom = require('geometry');
var ccp = geom.ccp;

var Scene = cocos.nodes.Scene;
var Director = cocos.Director;

var DataImporter = require('/DataImporter');
var BlastDownChartLayer = require('/BlastDownChartLayer');

function main() {
	var director = Director.sharedDirector;

	events.addListener(director, 'ready', function(director) {
		var dataImporter = new DataImporter();
		dataImporter.onDataReady(function(script) {
			var scene = new Scene();
			var layer = new BlastDownChartLayer(script);

			scene.addChild(layer);
			director.replaceScene(scene);
		});
	})

	director.runPreloadScene();
}

exports.main = main;

