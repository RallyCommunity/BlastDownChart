var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;
var JumpBy = cocos.actions.JumpBy;
var Sequence = cocos.actions.Sequence;
var RepeatForever = cocos.actions.RepeatForever;
var ScaleTo = cocos.actions.ScaleTo;
var FadeIn = cocos.actions.FadeIn;

var geom = require('geometry');
var Point = geom.Point;

var BaseShip = require('./BaseShip');

var Textures = require('../Textures');

function PIShipLow() {
	PIShipLow.superclass.constructor.call(this);

	this.sprite = new Sprite({
		texture: Textures.PIShipLow
	});

	this.sprite.anchorPoint = new Point(0, 0);
	this.addChild(this.sprite);
	this.contentSize = this.sprite.contentSize;
}

PIShipLow.inherit(BaseShip, {
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
	},
	
	weaken: function() {
		this.runAction(new ScaleTo({
			duration: 1,
			scale: 1
		}));
	},
	
  strengthen: function() {
		this.runAction(new ScaleTo({
			duration: 1,
			scale: 2
		}));
	}
});

module.exports = PIShipLow;




