var cocos = require('cocos2d');
var Node = cocos.nodes.Node;
var Sprite = cocos.nodes.Sprite;
var Spawn = cocos.actions.Spawn;
var MoveTo = cocos.actions.MoveTo;
var FadeIn = cocos.actions.FadeIn;
var Sequence = cocos.actions.Sequence;
var CallFunc = cocos.actions.CallFunc;

var geom = require('geometry');
var Point = geom.Point;

var LevelComplete = require('./LevelComplete');
var Textures = require('../Textures');

function LevelStart(contentSize) {
	LevelStart.superclass.constructor.call(this);
	this.contentSize = contentSize;
	this.anchorPoint = new Point(0, 0);

	var y = this.contentSize.height / 2;

	this.level = LevelComplete.prototype._createSprite.call(this, Textures.Level1);
	this.level.position = new Point(contentSize.width / 2 - this.level.contentSize.width - 10, y);

	this.start = LevelComplete.prototype._createSprite.call(this, Textures.Start);
	this.start.position = new Point(contentSize.width / 2 + 10, y);
}

LevelStart.inherit(Node, {
	_go: function(sprite, duration, x, callback) {
		var fade = new FadeIn({
			duration: duration
		});
		var moveTo = new MoveTo({
			duration: duration,
			position: new Point(x, sprite.position.y)
		});

		var actions = [fade, moveTo];

		if (callback) {
			actions.push(new CallFunc({
				method: callback
			}));
		}

		var sequence = new Sequence({
			actions: actions
		});

		sprite.runAction(sequence);
	},

	go: function(callback) {
		var duration = 1;

		this._go(this.level, duration, -140);
		this._go(this.start, duration, this.contentSize.width, callback);
	}
});

module.exports = LevelStart;

