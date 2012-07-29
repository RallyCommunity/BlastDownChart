var cocos = require('cocos2d');
var Node = cocos.nodes.Node;
var Sprite = cocos.nodes.Sprite;

var geom = require('geometry');
var Rect = geom.Rect;
var Point = geom.Point;

function OrangeParticle() {
	OrangeParticle.superclass.constructor.call(this);

	var sprite = new Sprite({
		file: '/resources/sprites.png',
		rect: new Rect(80, 0, 16, 16)
	});

	sprite.anchorPoint = new Point(0, 0);
	this.addChild({ child: sprite });
	this.contentSize = sprite.contentSize;
}

OrangeParticle.inherit(Node);

module.exports = OrangeParticle;



