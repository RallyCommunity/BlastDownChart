var cocos = require('cocos2d');
var MoveTo = cocos.actions.MoveTo;
var DelayTime = cocos.actions.DelayTime;
var CallFunc = cocos.actions.CallFunc;
var Sequence = cocos.actions.Sequence;
var ScaleTo = cocos.actions.ScaleTo;

// TODO: Vector should either be removed altogether or
// only used inside ParticleSystem, use Point instead
var Vector = require('../geometry/Vector');
var ParticleSystem = require('../particles/ParticleSystem');
var ExplosionAnimation = require('./ExplosionAnimation');

function BaseShip() {
	BaseShip.superclass.constructor.call(this);
}

BaseShip.inherit(cocos.nodes.Node, {
	_createExplodeParticles: function(position) {
		return new ParticleSystem({
			totalParticles: 25,
			duration: 0.35,
			removeWhenDone: true,
			gravity: new Vector(),
			centerOfGravity: new Vector(),
			angle: 0,
			angleVar: 360,
			radialAccel: 0,
			radialAccelVar: 0,
			position: position || new Vector(this.position.x, this.position.y),
			posVar: new Vector(4, 4),
			life: .5,
			lifeVar: 0,
			speed: 140,
			speedVar: 0,
			emissionRate: 25,
			active: true,
			radius: 8,
			startColor: [155, 155, 255, 200],
			startColorVar: [10, 10, 0, 10],
			endColor: [0, 0, 0, 0],
			endColorVar: [0, 0, 0, 0],
			startScale: 1,
			endScale: 0.1,
			startStrokeWidth: 6,
			endStrokeWidth: 0.1
		});
	},

	bob: function() {},
	weaken: function() {},
	strengthen: function() {},

	hatchGlow: function() {
	},

	spawnFrom: function(parentShip, start, end, callback) {
		this.position = start;

		var actions = [
		new MoveTo({
			duration: 1,
			position: end
		}), 
		new CallFunc({
			target: this,
			method: function() {
				callback(this);
			}
		})];

		this.runAction(new Sequence({
			actions: actions
		}));

		this.scale = 0.25;
		this.runAction(new ScaleTo({
			duration: 1.2,
			scale: 1
		}));
	},

	explode: function() {
		new ExplosionAnimation().go(this.parent, this.position);

		this.parent.removeChild(this);
	}
});

module.exports = BaseShip;

