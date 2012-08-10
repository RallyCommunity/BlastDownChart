var cocos = require('cocos2d');

var geom = require('geometry');
var Point = geom.Point;

var util = require('util');

var Textures = require('../Textures');

function Bullet(target) {
	Bullet.superclass.constructor.call(this);

	this._target = target;

	var sprite = new cocos.nodes.Sprite({
		texture: Textures.Bullet
	});

	sprite.anchorPoint = new Point(0, 0);
	this.addChild(sprite);

	this.contentSize = sprite.contentSize;

	this.velocity = new Point(0, 500);
	this.scheduleUpdate();
}

Bullet.inherit(cocos.nodes.Node, {
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

