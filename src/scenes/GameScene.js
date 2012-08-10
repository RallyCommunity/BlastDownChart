var cocos = require('cocos2d');
var Scene = cocos.nodes.Scene;

var PlayfieldLayer = require('../layers/PlayfieldLayer');


function GameScene(script) {
	GameScene.superclass.constructor.call(this);

	var layer = new PlayfieldLayer(script);
	this.addChild(layer);
}

GameScene.inherit(Scene);

module.exports = GameScene;

