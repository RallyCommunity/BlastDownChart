var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;

var PIShipMid = require('./PIShipMid');
var Textures = require('../Textures');



function PIShipHigh() {
		var sprite = new Sprite({
		texture: Textures.PIShipHigh
	});

	PIShipHigh.superclass.constructor.call(this, sprite);
}

PIShipHigh.inherit(PIShipMid);


module.exports = PIShipHigh;


