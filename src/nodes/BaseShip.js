var cocos = require('cocos2d');
var MoveTo = cocos.actions.MoveTo;
var DelayTime = cocos.actions.DelayTime;
var CallFunc = cocos.actions.CallFunc;
var Sequence = cocos.actions.Sequence;

// TODO: Vector should either be removed altogether or
// only used inside ParticleSystem, use Point instead
var Vector = require('../geometry/Vector');
var ParticleSystem = require('../particles/ParticleSystem');
var OrangeParticle = require('../particles/OrangeParticle');
var BrownParticle = require('../particles/BrownParticle');

function BaseShip() {
	BaseShip.superclass.constructor.call(this);
}

BaseShip.inherit(cocos.nodes.Node, {
	_addExplodeParticleSystem: function() {
		var explode = new ParticleSystem({
			totalParticles: 100,
			duration: 1,
			removeWhenDone: true,
			gravity: new Vector(),
			centerOfGravity: new Vector(),
			angle: 90,
			angleVar: 360,
			radialAccel: 0,
			radialAccelVar: 0,
			position: new Vector(this.position.x, this.position.y),
			posVar: new Vector(),
			life: 1.5,
			lifeVar: 0.75,
			speed: 30,
			speedVar: 8,
			emissionRate: 100,
			active: true,
			particleTypes: [OrangeParticle, BrownParticle],
			startOpacity: 200,
			endOpacity: 0,
			startScale: 1,
			endScale: 0.1
		});

		this.parent.addChild(explode);
	},

	bob: function() {},
		
	weaken: function() {},
	
  strengthen: function() {},

	spawnFrom: function(start, end, callback) {
		this.position = start;

		var actions = [
		new MoveTo({
			duration: 1,
			position: end
		}), new DelayTime(1), new CallFunc({
			target: this,
			method: function() {
				callback(this);
			}
		})];

		this.runAction(new Sequence({
			actions: actions
		}));
	},

	explode: function() {
		this._addExplodeParticleSystem();
		this.parent.removeChild(this);
	}
});

module.exports = BaseShip;

