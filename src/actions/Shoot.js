var cocos = require('cocos2d');
var util = require('util');

var Bullet = require('/Bullet');


function Shoot(id) {
	Shoot.superclass.constructor.call(this);
	this.targetId = id;
};

Shoot.inherit(cocos.actions.ActionInstant, {
	startWithTarget: function(node) {
		this.node = node;
		var bullet = new Bullet(this.targetId);
		bullet.position = util.copy(this.node.position);
		this.node.parent.addChild(bullet);
	}
});

module.exports = Shoot;

