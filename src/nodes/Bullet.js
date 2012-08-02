var cocos = require('cocos2d');

var geom = require('geometry');
var Point = geom.Point;

var util = require('util');

var ParticleSystem = require('../particles/ParticleSystem');
var Vector = require('../geometry/Vector');
var Textures = require('../Textures');

function Bullet(target) {
	Bullet.superclass.constructor.call(this);

	this._target = target;

	var sprite = new cocos.nodes.Sprite({
		texture: Textures.Bullet
	});

	sprite.anchorPoint = new Point(0, 0);
	this.addChild(sprite);

	//this.addChild(this._createGlow());

	this.contentSize = sprite.contentSize;

	this.velocity = new Point(0, 500);
	this.scheduleUpdate();
}

Bullet.inherit(cocos.nodes.Node, {
	_createGlow: function() {
		return new ParticleSystem({
			totalParticles: 200,
			duration: Infinity,
			gravity: new Vector(0, -5),
			centerOfGravity: new Vector(),
			angle: -90,
			angleVar: 7,
			speed: 35,
			speedVar: 5,
			radialAccel: -20,
			radialAccelVar: 0,
			tangentialAccel: 20,
			tangentialAccelVar: 0,
			position: new Vector(2, 4),
			posVar: new Vector(),
			life: 0.35,
			lifeVar: 0.1,
			emissionRate: 200 / 4,
			startColor: [181, 253, 172, 180],
			startColorVar: [0, 0, 0, 0],
			endColor: [0, 0, 0, 0],
			endColorVar: [0, 0, 0, 0],
			radius: 3,
			startScale: 1,
			endScale: 0.01,
			zOrder: -1,
			active: true
		});
	},

	_checkForTargetCollision: function() {
		var targetBox = this._target.boundingBox;

		if (geom.rectOverlapsRect(this.boundingBox, targetBox)) {
			this._target.explode();
			this.parent.removeChild(this);

			this.onImpact && this.onImpact(this._target);
		}
	},

	update: function(dt) {
		var winSize = cocos.Director.sharedDirector.winSize;

		var pos = util.copy(this.position);

		pos.y += dt * this.velocity.y;

		if (pos.y > winSize.height) {
			this.parent.removeChild(this);
		}

		this.position = pos;

		this._checkForTargetCollision();
	},
});

module.exports = Bullet;

