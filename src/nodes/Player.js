var cocos = require('cocos2d');
var geom = require('geometry');
var Sequence = cocos.actions.Sequence;
var MoveTo = cocos.actions.MoveTo;
var DelayTime = cocos.actions.DelayTime;

var Shoot = require('/actions/Shoot');

function Player() {
	Player.superclass.constructor.call(this);

	var sprite = new cocos.nodes.Sprite({
		file: '/resources/sprites.png',
		rect: new geom.Rect(0, 0, 64, 16)
	});

	sprite.anchorPoint = new geom.Point(0, 0);
	this.addChild({ child: sprite });
	this.contentSize = sprite.contentSize;

}

Player.inherit(cocos.nodes.Node, {
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


