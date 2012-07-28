var geom = require('geometry');

var MotherShip = require('/nodes/MotherShip');
var PIShip = require('/nodes/PIShip');
var StoryShip = require('/nodes/StoryShip');

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

	_positionShip: function(ship) {
		// TODO: this is just temporary to get something in there

		this._shipXs = this._shipXs || [60, 150, 240, 330];

		this._shipY = this._shipY || this._winSize.height - 20;
		var xi = Math.floor(Math.random() * this._shipXs.length);

		ship.position = new geom.Point(this._shipXs[xi], this._shipY);
		ship.centerX = ship.position.x + ship.contentSize.width;
		this._shipY -= ship.contentSize.height + 20;
	},


	spawn: function(config) {
		var Constructor = shipMap[config.type];
		var ship = new Constructor();
		ship._id = config.id;
		this._positionShip(ship);
		ship.bob();
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


