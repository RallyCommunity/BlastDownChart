var cocos = require('cocos2d');
var geom = require('geometry');

var ScriptRunner = require('/scripting/ScriptRunner');
var ScriptHandler = require('/scripting/ScriptHandler');
var Player = require('/Player');
var Shoot = require('/actions/Shoot');

function PlayfieldLayer(script) {
	PlayfieldLayer.superclass.constructor.call(this);

	var winSize = cocos.Director.sharedDirector.winSize;

	var player = new Player();
	player.position = new geom.Point(winSize.width / 2, 40);
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

