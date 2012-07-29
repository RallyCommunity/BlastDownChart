var cocos = require('cocos2d');
var Label = cocos.nodes.Label;
var Sequence = cocos.actions.Sequence;
var FadeIn = cocos.actions.FadeIn;
var FadeOut = cocos.actions.FadeOut;
var DelayTime = cocos.actions.DelayTime;
var CallFunc = cocos.actions.CallFunc;

var geom = require('geometry');
var Point = geom.Point;

var util = require('util');

var Bullet = require('../nodes/Bullet');

function Shoot(target) {
	Shoot.superclass.constructor.call(this);
	this.target = target;
}

Shoot.inherit(cocos.actions.ActionInstant, {
	_onBulletImpact: function(target) {
		// TODO: this is spiked in, just to get the ball
		// rolling on what kind of feedback we want to give about artifact data
		// in reality this should be a full fledged message display system, not
		// tacked on here

		if (target._name) {
			var label = new Label({
				string: target._id + ': "' + target._name + '" was accepted'
			});
			label.anchorPoint = new Point(0,0);
			label.position = new Point(5, this.node.parent.contentSize.height - 20);

			var actions = [
			new FadeIn({duration: 1.5}), new FadeOut({duration: 1.5}), new CallFunc({
				method: function() {
					label.parent.removeChild(label);
				}
			})];

			label.opacity = 0;
			label.runAction(new Sequence({
				actions: actions
			}));

			this.node.parent.addChild(label);
		}
	},

	startWithTarget: function(node) {
		this.node = node;

		var bullet = new Bullet(this.target);
		bullet.position = util.copy(node.position);
		bullet.zOrder = node.zOrder - 1;

		bullet.onImpact = this._onBulletImpact.bind(this);

		node.parent.addChild(bullet);
	}
});

module.exports = Shoot;

