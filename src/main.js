(function() {
	// override require to force relative paths
	var realRequire = this.require;

	this.require = function(path) {
		if (path[0] === '/') {
			throw new Error('require: please only use relative paths');
		}
		return realRequire.apply(this, arguments);
	};
})();

var cocos = require('cocos2d');
var events = require('events');
var geom = require('geometry');
var Point = geom.Point;

var Scene = cocos.nodes.Scene;
var Director = cocos.Director;

var DataImporter = require('./DataImporter');
var PlayfieldLayer = require('./layers/PlayfieldLayer');
var Vector = require('./geometry/Vector');
var Textures = require('./Textures');

var Transition = cocos.nodes.TransitionMoveInB;
//var Transition = cocos.nodes.TransitionSlideInR;
var TitleScene = require('./scenes/TitleScene');
var GameScene = require('./scenes/GameScene');

function main() {
	Textures.load(function() {

		var director = Director.sharedDirector;
		director.maxFrameRate = 60;
		director.attachInView();
		//director.displayFPS = true;
		var dataImporter = new DataImporter();
		dataImporter.onDataReady(function(script) {

			var titleScene = new TitleScene(3, function() {
				director.replaceScene(new GameScene(script));
			});
			director.runWithScene(titleScene);
		});
	});
}

exports.main = main;

