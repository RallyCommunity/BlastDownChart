var cocos = require('cocos2d');
var geom = require('geometry');

function ScriptRunner(script, layer, player) {
	this._script = script;
	this._layer = layer;
	this._player = player;
	
	this._elapsed = 0;
}

ScriptRunner.prototype = {
	_getNextEvent: function() {
		for (var i = 0; i < this._script.length; ++i) {
			var entry = this._script[i];

			if (!entry.invoked && entry.at <= this._elapsed) {
				return entry;
			} else if (entry.at > this._elapsed) {
				break;
			}
		}
	},

	_doEvent: function(event) {
		this['_' + event.event].call(this, event.args);
		event.invoked = true;
	},

	_positionShip: function(ship) {
		// TODO: this is just temporary to get something in there

		var winSize = cocos.Director.sharedDirector.winSize;

		this._shipXs = this._shipXs || [60, 150, 240, 330];

		this._shipY = this._shipY || winSize.height - 20;
		var xi = Math.floor(Math.random() * this._shipXs.length);

		ship.position = new geom.Point(this._shipXs[xi], this._shipY);
		ship.centerX = ship.position.x + ship.contentSize.width;
		this._shipY -= ship.contentSize.height + 20;
	},

	_spawn: function(config) {
		var ship = new config.type();
		ship._id = config.id;
		this._positionShip(ship);
		ship.bob();
		this._layer.addChild(ship);
	},

	_shoot: function(id) {
		var ship = this._layer.findShipById(id);

		if (ship) {
			this._player.shootAt(ship);
		}
	},

	update: function(dt) {
		this._elapsed += dt;

		var event = this._getNextEvent();
		if(event) {
			this._doEvent(event);
		}
	}
};

module.exports = ScriptRunner;

