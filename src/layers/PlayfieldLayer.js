var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;
var Director = cocos.Director;

var geom = require('geometry');
var Rect = geom.Rect;
var Point = geom.Point;

var ScriptRunner = require('../scripting/ScriptRunner');
var ScriptHandler = require('../scripting/ScriptHandler');
var Player = require('../nodes/Player');
var Shoot = require('../actions/Shoot');

function PlayfieldLayer(script) {
	PlayfieldLayer.superclass.constructor.call(this);

	var winSize = Director.sharedDirector.winSize;

	var bg = new Sprite({
		file: '/resources/stars.png',
		rect: new Rect(0, 0, 480, 640)
	});
	bg.anchorPoint = new Point(0, 0);
	bg.zOrder = -5000;
	
	this.addChild(bg);

	var player = new Player();
	player.position = new Point(winSize.width / 2, 90);
	this.addChild(player);

	this._scriptRunner = new ScriptRunner(script, new ScriptHandler(this, player, winSize));

	this.scheduleUpdate();
}

PlayfieldLayer.inherit(cocos.nodes.Layer, {
	findShipById: function(id) {
		// TODO: this really should be using tags
		return this.children.filter(function(child) {
			return child._id === id;
		})[0];
	},

	update: function(dt) {
		this._scriptRunner.update(dt);
	}
});

module.exports = PlayfieldLayer;

