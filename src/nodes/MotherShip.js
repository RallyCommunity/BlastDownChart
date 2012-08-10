var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;
var MoveBy = cocos.actions.MoveBy;
var Sequence = cocos.actions.Sequence;
var Spawn = cocos.actions.Spawn;
var RepeatForever = cocos.actions.RepeatForever;
var MoveTo = cocos.actions.MoveTo;
var DelayTime = cocos.actions.DelayTime;
var CallFunc = cocos.actions.CallFunc;
var FadeOut = cocos.actions.FadeOut;

var geom = require('geometry');
var Point = geom.Point;

var BaseShip = require('./BaseShip');
var Textures = require('../Textures');
var MotherExplosionAnimation = require('./MotherExplosionAnimation');

var Random = require('../util/Random');

function MotherShip() {
	MotherShip.superclass.constructor.call(this);

	this.sprite = new Sprite({
		texture: Textures.MotherShip
	});

	this.sprite.anchorPoint = new Point(0, 0);
	this.addChild(this.sprite);
	this.contentSize = this.sprite.contentSize;
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
		this.stopAllActions();

		var actions = [];

		var explosionXs = [-60, - 30, 0, 30, 60];

		var me = this;
		var parent = this.parent;

		function addExplosions() {
			for (var i = 0; i < explosionXs.length; ++i) {
				var xOffset = explosionXs[i];
				var p = new Point(me.position.x + xOffset, me.position.y + Random.rand(-30, 30));
				(function(pos) {
					actions.push(new CallFunc({
						target: me,
						method: function() {
							new MotherExplosionAnimation().go(parent, pos, me.zOrder + 1, Random.rand(1, 1.5, true));
						}
					}));
				})(p);

				actions.push(new DelayTime({
					duration: 0.4
				}));
			}
		}

		addExplosions();

		actions.push(new CallFunc({
			target: this,
			method: function() {
				this.parent.removeChild(this);
			}
		}));

		actions.push(new DelayTime({ duration: 0.2 }));

		actions.push(new CallFunc({
			target: me,
			method: function() {
				new MotherExplosionAnimation().go(parent, this.position, me.zOrder + 1, 1.5);
			}
		}));

		this.runAction(new Sequence({
			actions: actions
		}));

		this.sprite.runAction(new FadeOut({
			duration: 4
		}));
	},

	spawnFrom: function(parentShip, start, end, callback) {
		this.position = start;

		var actions = [
		new MoveTo({
			duration: 3,
			position: end
		}), new CallFunc({
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

