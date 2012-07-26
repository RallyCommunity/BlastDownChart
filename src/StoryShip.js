var cocos = require('cocos2d');
var geom = require('geometry');

function StoryShip() {
	StoryShip.superclass.constructor.call(this);

	var sprite = new cocos.nodes.Sprite({
		file: '/resources/sprites.png',
		rect: new geom.Rect(0, 0, 64, 16)
	});

	sprite.anchorPoint = new geom.Point(0, 0);
	this.addChild({ child: sprite });
	this.contentSize = sprite.contentSize;

}

StoryShip.inherit(cocos.nodes.Node);


module.exports = StoryShip;



