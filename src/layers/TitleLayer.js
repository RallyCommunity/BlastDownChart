var cocos = require('cocos2d');
var Layer = cocos.nodes.Layer;
var Sprite = cocos.nodes.Sprite;
var Director = cocos.Director;

var geom = require('geometry');
var Point = geom.Point;

var Textures = require('../Textures');


function TitleLayer() {
	TitleLayer.superclass.constructor.call(this);

	var winSize = Director.sharedDirector.winSize;

	var bg = new Sprite({
		texture: Textures.bg
	});
	bg.anchorPoint = new Point(0, 0);

	var title = new Sprite({
		texture: Textures.titleOverlay
	});

	title.anchorPoint = new Point(0, 0.5);
	title.position = new Point(0, winSize.height / 2);

	this.addChild(bg);
	this.addChild(title);

}

TitleLayer.inherit(Layer);

module.exports = TitleLayer;

