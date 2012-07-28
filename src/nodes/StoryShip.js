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

StoryShip.inherit(cocos.nodes.Node, {
	bob: function() {
		var jumpRight = new cocos.actions.JumpBy({
			duration: 0.5,
			delta: new geom.Point(14, 0),
			height: - 8,
			jumps: 1
		});
		var jumpLeft = jumpRight.reverse();

		var jumpSequence = new cocos.actions.Sequence({
			actions: [jumpRight, jumpLeft]
		});

		this.runAction(new cocos.actions.RepeatForever(jumpSequence));
	}
});

module.exports = StoryShip;



