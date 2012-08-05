var cocos = require('cocos2d');
var Label = cocos.nodes.Label;
var FadeIn = cocos.actions.FadeIn;

var geom = require('geometry');
var Point = geom.Point;

var MotherShip = require('../nodes/MotherShip');
var PIShipMid = require('../nodes/PIShipMid');
var PIShipLow = require('../nodes/PIShipLow');
var StoryShip = require('../nodes/StoryShip');
var LevelComplete = require('../nodes/LevelComplete');
var LevelStart = require('../nodes/LevelStart');

var Random = require('../util/Random');

var shipMap = {
	Mother: MotherShip,
	PIMid : PIShipMid,
	PILow: PIShipLow,
	Story: StoryShip
};

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

	this.levelStart();
}

ScriptHandler.inherit(Object, {

	_getStartForShip: function(parentId) {
		return (parentId && this._layer.findShipById(parentId).position) || 
			new Point(this._winSize.width / 2, this._winSize.height + 100);
	},

	_getDestinationForShip: function(type, parentId) {
		// TODO: temporary and very dumb algorithm here, this is really the meat of BDC,
		// figuring out how to place ships based on their type, their parent and the
		// current state of the world. This will expand a lot.

		var parent = this._layer.findShipById(parentId);

		if(!parent) { // mother ship
			return new Point(this._winSize.width / 2, this._winSize.height - 100);
		} else {
			if(parent._type === 'Mother') {
				this._piXs = this._piXs || [100, 220, 380];

				return new Point(this._piXs.pop(), this._winSize.height - 230 + Random.rand(-20, 30));
			} else {
				parent._yc = parent._yc || 1;
				return new Point(parent.position.x, parent.position.y - 50 - (parent._yc++ * 50)); 
			}
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
		ship._id = config.id;
		ship._type = config.type;
		ship._name = config.name;
		ship.zOrder = this._getZOrder(config.from);

		var parentShip = this._layer.findShipById(config.from);

		var start = this._getStartForShip(config.from);
		var destination = this._getDestinationForShip(config.type, config.from);
		
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
		levelStart.go(function() {
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


