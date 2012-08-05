var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;
var MoveBy = cocos.actions.MoveBy;
var Sequence = cocos.actions.Sequence;
var RepeatForever = cocos.actions.RepeatForever;
var MoveTo = cocos.actions.MoveTo;
var DelayTime = cocos.actions.DelayTime;
var CallFunc = cocos.actions.CallFunc;

var geom = require('geometry');
var Point = geom.Point;

var BaseShip = require('./BaseShip');
var Textures = require('../Textures');

function MotherShip() {
	MotherShip.superclass.constructor.call(this);

	var sprite = new Sprite({
		texture: Textures.MotherShip
	});

	sprite.anchorPoint = new Point(0, 0);
	this.addChild(sprite);
	this.contentSize = sprite.contentSize;
}

MotherShip.inherit(BaseShip, {
	bob: function() {
		var moveRight = new MoveBy({
			duration: 2,
			position: new Point(30, 0),
		});
		var moveLeft = moveRight.reverse();

		var moveSequence = new Sequence({
			actions: [moveRight, moveLeft]
		});

		this.runAction(new RepeatForever(moveSequence));
	},

	explode: function() {

		var explosionXs = [ -60, -30, 0, 30, 60 ];

		for(var i = 0; i < explosionXs.length; ++i) {
			var xOffset = explosionXs[i];
			var p = new Point(this.position.x + xOffset, this.position.y);
			this.parent.addChild(this._createExplode(p));
		}
		this.parent.removeChild(this);
	},

	spawnFrom: function(parentShip, start, end, callback) {
		this.position = start;

		var actions = [
		new CallFunc({
			target: this,
			method: function() {
				parentShip && parentShip.hatchGlow(1.2);
			}
		}),
		new MoveTo({
			duration: 3,
			position: end
		}), 
		new DelayTime({duration: 1}), 
		new CallFunc({
			target: this,
			method: function() {
				callback(this);
			}
		})];

		this.runAction(new Sequence({
			actions: actions
		}));
	}
});

module.exports = MotherShip;


