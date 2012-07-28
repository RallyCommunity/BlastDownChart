var geom = require('geometry');
var Point = geom.Point;

var MotherShip = require('../nodes/MotherShip');
var PIShip = require('../nodes/PIShip');
var StoryShip = require('../nodes/StoryShip');

var shipMap = {
	Mother: MotherShip,
	PI : PIShip,
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

		this._yc = this._yc || 1;

		if(type === 'Mother') {
			return new Point(this._winSize.width / 2, this._winSize.height - 20);
		} else {
			var parent = this._layer.findShipById(parentId);

			if(parent._type === 'Mother') {
				return new Point(200, this._winSize.height - 150);
			} else {
				return new Point(200, this._winSize.height - 150 - (this._yc++ * 50)); 
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
		ship.zOrder = this._getZOrder(config.from);

		var start = this._getStartForShip(config.from);
		var destination = this._getDestinationForShip(config.type, config.from);
		
		ship.spawnFrom(start, destination, function(ship) {
			ship.bob();
		});

		this._layer.addChild(ship);
	},

	shoot: function(id) {
		var ship = this._layer.findShipById(id);

		if (ship) {
			this._player.shootAt(ship);
		}
	}
});

module.exports = ScriptHandler;


