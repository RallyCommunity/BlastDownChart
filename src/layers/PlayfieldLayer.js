var cocos = require('cocos2d');
var Sprite = cocos.nodes.Sprite;
var MoveBy = cocos.actions.MoveBy;
var Director = cocos.Director;

var geom = require('geometry');
var Point = geom.Point;

var ScriptRunner = require('../scripting/ScriptRunner');
var ScriptHandler = require('../scripting/ScriptHandler');
var Player = require('../nodes/Player');
var Shoot = require('../actions/Shoot');
var Textures = require('../Textures');

function PlayfieldLayer(script) {
	PlayfieldLayer.superclass.constructor.call(this);

	var winSize = Director.sharedDirector.winSize;

	var bg = new Sprite({
		texture: Textures.bg
	});
	bg.anchorPoint = new Point(0, 0);
	bg.zOrder = -5000;
	
	this.addChild(bg);

	this.player = new Player();
	this.player.position = new Point(winSize.width / 2, -30);
	this.addChild(this.player);

	this._scriptRunner = new ScriptRunner(script, new ScriptHandler(this, this.player, winSize));

	this.scheduleUpdate();
}

PlayfieldLayer.inherit(cocos.nodes.Layer, {
	findShipById: function(id) {
		// TODO: this really should be using tags
		return id && this.children.filter(function(child) {
			return child._id === id;
		})[0];
	},

	startScript: function() {
		this._scriptRunning = true;
	},

	update: function(dt) {
		if(this._scriptRunning) {
			this._scriptRunner.update(dt);
		}
	},

	flyPlayerIn: function() {
		this.player.runAction(new MoveBy({
			duration: 1,
			position: new Point(0, 70)
		}));
	},

	flyPlayerOff: function() {
		this.player.runAction(new MoveBy({
			duration: 2,
			position: new Point(0, this.contentSize.height + 100)
		}));
	}
});

module.exports = PlayfieldLayer;

