var cocos = require('cocos2d');
var Node = cocos.nodes.Node;
var Sprite = cocos.nodes.Sprite;

var geom = require('geometry');
var Rect = geom.Rect;
var Point = geom.Point;

function BrownParticle() {
	BrownParticle.superclass.constructor.call(this);

	var sprite = new Sprite({
		file: '/resources/sprites.png',
		rect: new Rect(96, 0, 16, 16)
	});

	sprite.anchorPoint = new Point(0, 0);
	this.addChild(sprite);
	this.contentSize = sprite.contentSize;
}

BrownParticle.inherit(Node);

module.exports = BrownParticle;




