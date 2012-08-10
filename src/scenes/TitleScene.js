var cocos = require('cocos2d');
var Scene = cocos.nodes.Scene;

var TitleLayer = require('../layers/TitleLayer');

function TitleScene(duration, callback) {
	TitleScene.superclass.constructor.call(this);

	var titleLayer = new TitleLayer();
	this.addChild(titleLayer);

	this.scheduleUpdate();

	this._elapsed = 0;
	this._duration = duration || 2;
	this._callback = callback;
}

TitleScene.inherit(Scene, {
	update: function(dt) {
		this._elapsed += dt;

		if(this._elapsed > this._duration && this._callback) {
			this._callback();
		}
	}
});


module.exports = TitleScene;

