var cocos = require('cocos2d');
var geom = require('geometry');

function MotherShip() {
	MotherShip.superclass.constructor.call(this);

	var sprite = new cocos.nodes.Sprite({
		file: '/resources/sprites.png',
		rect: new geom.Rect(0, 16, 128, 16)
	});

	sprite.anchorPoint = new geom.Point(0, 0);
	this.addChild({ child: sprite });
	this.contentSize = sprite.contentSize;
}

MotherShip.inherit(cocos.nodes.Node, {
	bob: function() {
		var moveRight = new cocos.actions.MoveBy({
			duration: 2,
			position: new geom.Point(16, 0),
		});
		var moveLeft = moveRight.reverse();

		var moveSequence = new cocos.actions.Sequence({
			actions: [moveRight, moveLeft]
		});

		this.runAction(new cocos.actions.RepeatForever(moveSequence));
	}
});

module.exports = MotherShip;


