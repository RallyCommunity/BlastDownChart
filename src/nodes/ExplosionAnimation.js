var cocos = require('cocos2d');
var Node = cocos.nodes.Node;
var SpriteFrame = cocos.SpriteFrame;
var Sprite = cocos.nodes.Sprite;
var Animation = cocos.Animation;
var Animate = cocos.actions.Animate;
var Sequence = cocos.actions.Sequence;
var CallFunc = cocos.actions.CallFunc;

var geom = require('geometry');
var Rect = geom.Rect;
var Point = geom.Point;

var Textures = require('../Textures');

function ExplosionAnimation() {
	ExplosionAnimation.superclass.constructor.call(this);

	var textures = [Textures.explosionSmall, Textures.explosionMed, Textures.explosionLarge, Textures.explosionMed, Textures.explosionSmall];


	this.animFrames = [];

	textures.forEach(function(texture) {
		this.animFrames.push(new SpriteFrame({
			texture: texture,
			rect: new Rect(0, 0, texture.contentSize.width, texture.contentSize.height)
		}));
	}, this);

	this.sprite = new Sprite( { frame: this.animFrames[0] } );

	this.addChild(this.sprite);
}

ExplosionAnimation.inherit(Node, {

	go: function(parent, position, zOrder, scale) {
		this.position = position;
		this.zOrder = zOrder || 0;
		this.scale = scale || 1;
		parent.addChild(this);

		var animation = new Animation( { frames: this.animFrames, delay: 0.06 } );
		var animate = new Animate( { animation: animation, restoreOriginalFrame: false } );
		var remove = new CallFunc({
			target: this,
			method: function() {
				parent.removeChild(this);
			}
		});

		var actions = [animate, remove];
			

		this.sprite.runAction(new Sequence({ actions: actions }));
	}

});




module.exports = ExplosionAnimation;


