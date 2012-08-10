var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;
var Node = cocos.nodes.Node;
var Sequence = cocos.actions.Sequence;
var MoveTo = cocos.actions.MoveTo;
var DelayTime = cocos.actions.DelayTime;

var geom = require('geometry');
var Point = geom.Point;

var Shoot = require('../actions/Shoot');

var Vector = require('../geometry/Vector');
var ParticleSystem = require('../particles/ParticleSystem');

var Textures = require('../Textures');

function Player() {
	Player.superclass.constructor.call(this);

	var sprite = new Sprite({
		texture: Textures.Player
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
				new DelayTime({ duration: 0.2 }),
				new Shoot(ship)
			]
		}));
	}
});

module.exports = Player;


