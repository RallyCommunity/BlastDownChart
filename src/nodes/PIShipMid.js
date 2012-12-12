var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;
var MoveBy = cocos.actions.MoveBy;
var Sequence = cocos.actions.Sequence;
var RepeatForever = cocos.actions.RepeatForever;
var FadeIn = cocos.actions.FadeIn;

var geom = require('geometry');
var Point = geom.Point;

var BaseShip = require('./BaseShip');

var Textures = require('../Textures');

function PIShipMid(sprite) {
	PIShipMid.superclass.constructor.call(this);

	this.sprite = sprite || new Sprite({
		texture: Textures.PIShipMid
	});

	this.sprite.anchorPoint = new Point(0, 0);
	this.addChild(this.sprite);
	this.contentSize = this.sprite.contentSize;
}

PIShipMid.inherit(BaseShip, {
	bob: function() {
		var moveRight = new MoveBy({
			duration: .75,
			position: new Point(8, 0),
		});
		var moveLeft = moveRight.reverse();

		var moveSequence = new Sequence({
			actions: [moveRight, moveLeft]
		});

		this.runAction(new RepeatForever(moveSequence));
	}
});

module.exports = PIShipMid;



