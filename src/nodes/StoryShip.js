var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;
var JumpBy = cocos.actions.JumpBy;
var Sequence = cocos.actions.Sequence;
var RepeatForever = cocos.actions.RepeatForever;

var geom = require('geometry');
var Point = geom.Point;
var Rect = geom.Rect;

var BaseShip = require('./BaseShip');

function StoryShip() {
	StoryShip.superclass.constructor.call(this);

	var sprite = new Sprite({
		file: '/resources/sprites.png',
		rect: new Rect(0, 32, 32, 16)
	});

	sprite.anchorPoint = new Point(0, 0);
	this.addChild({ child: sprite });
	this.contentSize = sprite.contentSize;
}

StoryShip.inherit(BaseShip, {
	bob: function() {
		var jumpRight = new JumpBy({
			duration: 0.5,
			delta: new Point(14, 0),
			height: -8,
			jumps: 1
		});
		var jumpLeft = jumpRight.reverse();

		var jumpSequence = new Sequence({
			actions: [jumpRight, jumpLeft]
		});

		this.runAction(new RepeatForever(jumpSequence));
	}
});

module.exports = StoryShip;



