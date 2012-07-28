var cocos = require('cocos2d');
var events = require('events');
var geom = require('geometry');
var ccp = geom.ccp;

var Scene = cocos.nodes.Scene;
var Director = cocos.Director;

var DataImporter = require('/DataImporter');
var PlayfieldLayer = require('/layers/PlayfieldLayer');

function main() {
	var director = Director.sharedDirector;
	director.maxFrameRate = 60;
	director.displayFPS = true;

	events.addListener(director, 'ready', function(director) {
		var dataImporter = new DataImporter();
		dataImporter.onDataReady(function(script) {
			var scene = new Scene();
			var layer = new PlayfieldLayer(script);

			scene.addChild(layer);
			director.replaceScene(scene);
		});
	})

	director.runPreloadScene();
}

exports.main = main;

