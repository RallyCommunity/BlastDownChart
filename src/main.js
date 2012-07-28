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
var ParticleSystem = require('./particles/ParticleSystem');
var BasicParticle = require('./particles/BasicParticle');
var Vector = require('./geometry/Vector');

function getParticleSystem() {
	var winSize = Director.sharedDirector.winSize;

	return new ParticleSystem({
		totalParticles: 100,
		duration: Infinity,
		gravity: new Vector(-200, - 200),
		centerOfGravity: new Vector(),
		angle: 90,
		angleVar: 360,
		speed: 13,
		speedVar: 5,
		radialAccel: 0,
		radialAccelVar: 0,
		tangentialAccel: 0,
		tangentialAccelVar: 0,
		position: new Point(winSize.width / 2, winSize.height / 2),
		posVar: new Vector(),
		life: 0.7,
		lifeVar: 0.2,
		emissionRate: 100 / 1,
		startSize: 3,
		startSizeVar: 0.5,
		endSize: 0.5,
		endSizeVar: 0,
		active: true,
		particleType: BasicParticle
	});
}

function main() {
	var director = Director.sharedDirector;
	director.maxFrameRate = 60;
	director.displayFPS = true;

	events.addListener(director, 'ready', function(director) {
		var dataImporter = new DataImporter();
		dataImporter.onDataReady(function(script) {
			var scene = new Scene();
			var layer = new PlayfieldLayer(script);

			layer.addChild(getParticleSystem());

			scene.addChild(layer);
			director.replaceScene(scene);
		});
	})

	director.runPreloadScene();
}

exports.main = main;

