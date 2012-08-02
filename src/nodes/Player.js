var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;
var Node = cocos.nodes.Node;
var Sequence = cocos.actions.Sequence;
var MoveTo = cocos.actions.MoveTo;
var DelayTime = cocos.actions.DelayTime;

var geom = require('geometry');
var Point = geom.Point;

var Shoot = require('../actions/Shoot');

var Vector = require('../geometry/Vector');
var ParticleSystem = require('../particles/ParticleSystem');

var Textures = require('../Textures');

function Player() {
	Player.superclass.constructor.call(this);

	var sprite = new Sprite({
		texture: Textures.Player
	});

	sprite.anchorPoint = new Point(0, 0);
	this.addChild({ child: sprite });
	this.contentSize = sprite.contentSize;
	
	this.addChild(this._createExhaust());
}

Player.inherit(Node, {
	_createExhaust: function() {
		return new ParticleSystem({
			totalParticles: 50,
			duration: Infinity,
			gravity: new Vector(),
			centerOfGravity: new Vector(),
			angle: -90,
			angleVar: 20,
			speed: 24,
			speedVar: 10,
			radialAccel: 0,
			radialAccelVar: 0,
			tangentialAccel: 0,
			tangentialAccelVar: 0,
			position: new Vector(this.contentSize.width / 2, 8),
			posVar: new Vector(),
			life: 0.5,
			lifeVar: 0.1,
			emissionRate: 50 / 1,
			active: true,
			startColor: [250, 100, 50, 222],
			startColorVar: [5, 20, 10, 20],
			endColor: [0, 0, 0, 0],
			endColorVar: [0, 0, 0, 0],
			radius: 2,
			startScale: 1,
			endScale: 0.1
		});
	},
	
	shootAt: function(ship) {
		this.runAction(new Sequence({
			actions: [
				new MoveTo({
					duration: 1,
					position: new geom.Point(ship.position.x, this.position.y)
				}),
				new DelayTime(0.2),
				new Shoot(ship)
			]
		}));
	}
});

module.exports = Player;


