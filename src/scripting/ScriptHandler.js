var cocos = require('cocos2d');
var Label = cocos.nodes.Label;
var FadeIn = cocos.actions.FadeIn;

var geom = require('geometry');
var Point = geom.Point;

var MotherShip = require('../nodes/MotherShip');
var PIShipHigh = require('../nodes/PIShipHigh');
var PIShipMid = require('../nodes/PIShipMid');
var PIShipLow = require('../nodes/PIShipLow');
var StoryShip = require('../nodes/StoryShip');
var LevelComplete = require('../nodes/LevelComplete');
var LevelStart = require('../nodes/LevelStart');

var ShipPlacer = require('./ShipPlacer');

var Textures = require('../Textures');


var shipMap = {
	Mother: MotherShip,
	PIHigh : PIShipHigh,
	PIMid : PIShipMid,
	PILow: PIShipLow,
	Story: StoryShip
};

var motherShipOffset = 100;

/*
 * ScriptHandler
 * -----
 * Handler for all script events in BlastDown Chart, responsible
 * for creating story/PI ships, shooting them, blocking, etc
 */
function ScriptHandler(layer, player, winSize) {
	this._layer = layer;
	this._player = player;
	this._winSize = winSize;

	var motherShipBottomY = winSize.height - motherShipOffset - Textures.MotherShip.contentSize.height;
	var columnArea = {
		width: winSize.width,
		height: motherShipBottomY
	};

	this._shipPlacer = new ShipPlacer(columnArea, motherShipBottomY);

	this.levelStart();
}

ScriptHandler.inherit(Object, {

	_getStartForShip: function(parentId) {
		return (parentId && this._layer.findShipById(parentId).position) || 
			new Point(this._winSize.width / 2, this._winSize.height + 100);
	},

	_getDestinationForShip: function(ship,parentShip) {
		if(!parentShip) { // mother ship
			return new Point(this._winSize.width / 2, this._winSize.height - motherShipOffset);
		} else {
			return this._shipPlacer.positionShip(ship, parentShip);
		}
	},

	_getZOrder: function(parentId) {
		if(!parentId) {
			return 1000;
		} else {
			return this._layer.findShipById(parentId).zOrder - 1;
		}
	},

	spawn: function(config) {
		var Constructor = shipMap[config.type];
		var ship = new Constructor();
		var parentId = config.from;
		ship._id = config.id;
		ship._parentId = parentId;
		ship._type = config.type;
		ship._name = config.name;
		ship.zOrder = this._getZOrder(parentId);

		var parentShip = this._layer.findShipById(parentId);

		var start = this._getStartForShip(config.from);
		var destination = this._getDestinationForShip(ship, parentShip);
		
		ship.spawnFrom(parentShip, start, destination, function(ship) {
			ship.bob();
		});

		this._layer.addChild(ship);
	},
	
	strengthen: function(id) {
		var ship = this._layer.findShipById(id);
		
		ship.strengthen();
	},

	weaken: function(id) {
		var ship = this._layer.findShipById(id);
		
		ship.weaken();
	},

	shoot: function(id) {
		var ship = this._layer.findShipById(id);

		if (ship) {
			this._player.shootAt(ship);
		}
	},

	levelStart: function() {
		var me = this;

		var levelStart = new LevelStart(this._layer.contentSize);
		this._layer.addChild(levelStart);
		levelStart.go(1, function() {
			me._layer.flyPlayerIn();
			me._layer.startScript();
		});
	},

	levelClear: function() {
		var me = this;

		var levelComplete = new LevelComplete(this._layer.contentSize);
		this._layer.addChild(levelComplete);
		levelComplete.go(function() {
			me._layer.flyPlayerOff();
		});
	}
});

module.exports = ScriptHandler;


