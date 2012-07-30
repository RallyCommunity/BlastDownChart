var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;
var MoveBy = cocos.actions.MoveBy;
var Sequence = cocos.actions.Sequence;
var RepeatForever = cocos.actions.RepeatForever;
var FadeIn = cocos.actions.FadeIn;

var geom = require('geometry');
var Point = geom.Point;
var Rect = geom.Rect;

var BaseShip = require('./BaseShip');

var ParticleSystem = require('../particles/ParticleSystem');
var Vector = require('../geometry/Vector');

function PIShip() {
	PIShip.superclass.constructor.call(this);

	this.sprite = new Sprite({
		file: '/resources/PIShip.png',
		rect: new Rect(0, 0, 50, 55)
	});

	this.sprite.anchorPoint = new Point(0, 0);
	this.addChild(this.sprite);
	this.contentSize = this.sprite.contentSize;
}

PIShip.inherit(BaseShip, {
	_createHatchGlow: function(duration) {
		return new ParticleSystem({
			totalParticles: 320,
			duration: duration || 0.5,
			removeWhenDone: true,
			gravity: new Vector(0, -10),
			centerOfGravity: new Vector(),
			angle: -90,
			angleVar: 0,
			radialAccel: 0,
			radialAccelVar: 0,
			position: new Vector(this.contentSize.width / 2, 20),
			posVar: new Vector(this.contentSize.width / 5, 0),
			life: 0.3,
			lifeVar: 0.1,
			speed: 40,
			speedVar: 0,
			emissionRate: 320,
			active: true,
			radius: 3,
			startColor: [191, 132, 237, 200],
			startColorVar: [0, 0, 0, 20],
			endColor: [0, 0, 0, 0],
			endColorVar: [0, 0, 0, 0],
			startScale: 1,
			endScale: 0.1,
			zOrder: -1
		});
	},

	hatchGlow: function(duration) {
		this.addChild(this._createHatchGlow(duration));
	},

	bob: function() {
		var moveRight = new MoveBy({
			duration: .75,
			position: new Point(8, 0),
		});
		var moveLeft = moveRight.reverse();

		var moveSequence = new Sequence({
			actions: [moveRight, moveLeft]
		});

		this.runAction(new RepeatForever(moveSequence));
	}
});

module.exports = PIShip;



