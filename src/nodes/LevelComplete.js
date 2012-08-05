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

var Textures = require('../Textures');

function LevelComplete(contentSize) {
	LevelComplete.superclass.constructor.call(this);
	this.contentSize = contentSize;
	this.anchorPoint = new Point(0, 0);

	var y = this.contentSize.height / 2;

	this.level = this._createSprite(Textures.Level);
	this.level.position = new Point(-30, y);

	this.complete = this._createSprite(Textures.Complete);
	this.complete.position = new Point(this.contentSize.width, y);
}

LevelComplete.inherit(Node, {
	_createSprite: function(texture) {
		var sprite = new Sprite({
			texture: texture
		});
		sprite.opacity = 0;
		sprite.anchorPoint = new Point(0, 0.5);
		this.addChild(sprite);

		return sprite;
	},

	_go: function(sprite, duration, x, callback) {
		var fade = new FadeIn({
			duration: duration
		});
		var moveTo = new MoveTo({
			duration: duration,
			position: new Point(x, sprite.position.y)
		});

		var spawn = new Spawn({
			one: fade,
			two: moveTo
		});

		if(callback) {
			sprite.runAction(new Sequence({
				actions: [spawn, new CallFunc({
					method: callback
				})]
			}));
		} else {
			sprite.runAction(spawn);
		}
	},

	go: function(callback) {
		var duration = 2;
		this._go(this.level, duration, this.contentSize.width / 2 - this.level.contentSize.width - 10);
		this._go(this.complete, duration, this.contentSize.width / 2 + 10, callback);
	}
});

module.exports = LevelComplete;

