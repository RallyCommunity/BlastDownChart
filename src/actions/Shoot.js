var cocos = require('cocos2d');
var util = require('util');

var Bullet = require('../nodes/Bullet');


function Shoot(target) {
	Shoot.superclass.constructor.call(this);
	this.target = target;
}

Shoot.inherit(cocos.actions.ActionInstant, {
	startWithTarget: function(node) {
		var bullet = new Bullet(this.target);
		bullet.position = util.copy(node.position);
		bullet.zOrder = node.zOrder - 1;

		node.parent.addChild(bullet);
		console.log('shooting ' + this.target._id);
	}
});

module.exports = Shoot;

