var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;
var Node = cocos.nodes.Node;
var Sequence = cocos.actions.Sequence;
var MoveTo = cocos.actions.MoveTo;
var DelayTime = cocos.actions.DelayTime;

var geom = require('geometry');
var Point = geom.Point;
var Rect = geom.Rect;

var Shoot = require('../actions/Shoot');

function Player() {
	Player.superclass.constructor.call(this);

	var sprite = new Sprite({
		file: '/resources/sprites.png',
		rect: new Rect(0, 0, 64, 16)
	});

	sprite.anchorPoint = new Point(0, 0);
	this.addChild({ child: sprite });
	this.contentSize = sprite.contentSize;

}

Player.inherit(Node, {
	shootAt: function(ship) {
		this.runAction(new Sequence({
			actions: [
				new MoveTo({
					duration: 1,
					position: new geom.Point(ship.position.x, this.position.y)
				}),
				new DelayTime(0.2),
				new Shoot(ship)
			]
		}));
	}
});

module.exports = Player;


