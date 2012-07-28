var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;
var MoveBy = cocos.actions.MoveBy;
var Sequence = cocos.actions.Sequence;
var RepeatForever = cocos.actions.RepeatForever;

var geom = require('geometry');
var Point = geom.Point;
var Rect = geom.Rect;

var BaseShip = require('/nodes/BaseShip');

function MotherShip() {
	MotherShip.superclass.constructor.call(this);

	var sprite = new Sprite({
		file: '/resources/sprites.png',
		rect: new Rect(0, 16, 128, 16)
	});

	sprite.anchorPoint = new Point(0, 0);
	this.addChild({ child: sprite });
	this.contentSize = sprite.contentSize;
}

MotherShip.inherit(BaseShip, {
	bob: function() {
		var moveRight = new MoveBy({
			duration: 2,
			position: new Point(16, 0),
		});
		var moveLeft = moveRight.reverse();

		var moveSequence = new Sequence({
			actions: [moveRight, moveLeft]
		});

		this.runAction(new RepeatForever(moveSequence));
	}
});

module.exports = MotherShip;


