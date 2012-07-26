var cocos = require('cocos2d');
var geom = require('geometry');
var util = require('util');

function Bullet(targetId) {
	Bullet.superclass.constructor.call(this);

	this.targetId = targetId;

	var sprite = new cocos.nodes.Sprite({
		file: '/resources/sprites.png',
		rect: new geom.Rect(64, 0, 16, 16)
	})

	sprite.anchorPoint = new geom.Point(0, 0)
	this.addChild({
		child: sprite
	})
	this.contentSize = sprite.contentSize

	this.velocity = new geom.Point(0, 500);
	this.scheduleUpdate();
}

Bullet.inherit(cocos.nodes.Node, {
	_checkForTargetCollision: function() {
		this.target = this.target || this.parent.findShipById(this.targetId);

		if(this.target) {
			var targetBox = this.target.boundingBox;

			if(geom.rectOverlapsRect(this.boundingBox, targetBox)) {
				this.parent.removeChild(this.target);
				this.parent.removeChild(this);
			}
		}
	},

	update: function(dt) {
		var winSize = cocos.Director.sharedDirector.winSize;

		var pos = util.copy(this.position);

		pos.y += dt * this.velocity.y;

		if(pos.y > winSize.height) {
			this.parent.removeChild(this);
		}

		this.position = pos;

		this._checkForTargetCollision();
	},
});

module.exports = Bullet;

