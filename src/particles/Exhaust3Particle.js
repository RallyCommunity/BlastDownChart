var cocos = require('cocos2d');
var Node = cocos.nodes.Node;
var Sprite = cocos.nodes.Sprite;

var geom = require('geometry');
var Rect = geom.Rect;
var Point = geom.Point;

function Exhaust3Particle() {
	Exhaust3Particle.superclass.constructor.call(this);

	var sprite = new Sprite({
		file: '/resources/exhaustParticles.png',
		rect: new Rect(4, 0, 2, 2)
	});

	sprite.anchorPoint = new Point(0, 0);
	this.addChild(sprite);
	this.contentSize = sprite.contentSize;
}

Exhaust3Particle.inherit(Node);

module.exports = Exhaust3Particle;





