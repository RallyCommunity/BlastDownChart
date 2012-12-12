var cocos = require('cocos2d');
var MoveTo = cocos.actions.MoveTo;
var DelayTime = cocos.actions.DelayTime;
var CallFunc = cocos.actions.CallFunc;
var Sequence = cocos.actions.Sequence;
var ScaleTo = cocos.actions.ScaleTo;

var ExplosionAnimation = require('./ExplosionAnimation');

function BaseShip() {
	BaseShip.superclass.constructor.call(this);
}

BaseShip.inherit(cocos.nodes.Node, {
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

