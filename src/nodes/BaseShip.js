var cocos = require('cocos2d');
var MoveTo = cocos.actions.MoveTo;
var DelayTime = cocos.actions.DelayTime;
var CallFunc = cocos.actions.CallFunc;
var Sequence = cocos.actions.Sequence;

function BaseShip() {
	BaseShip.superclass.constructor.call(this);
}

BaseShip.inherit(cocos.nodes.Node, {
	bob: function() {
	},

	spawnFrom: function(start, end, callback) {
		this.position = start;

		var actions = [
			new MoveTo({
				duration: 1,
				position: end
			}),
			new DelayTime(1),
			new CallFunc({
				target: this,
				method: function() {
					callback(this);
				}
			})
		];

		this.runAction(new Sequence({ actions: actions }));
	}
});

module.exports = BaseShip;




