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

		node.parent.addChild(bullet);
	}
});

module.exports = Shoot;

