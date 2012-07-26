var cocos = require('cocos2d');
var geom = require('geometry');

var Player = require('/Player');

function BlastDownChartLayer(script) {
	BlastDownChartLayer.superclass.constructor.call(this);

	var s = cocos.Director.sharedDirector.winSize;

	var player = new Player();
	player.position = new geom.Point(s.width / 2, 100);
	this.addChild(player);
	this.player = player;

	this.script = script;
	this.scheduleUpdate();
	this.elapsed = 0;
}

BlastDownChartLayer.inherit(cocos.nodes.Layer, {
	_findNextEvent: function(script, elapsed) {
		for (var i = 0; i < script.length; ++i) {
			var entry = script[i];

			if (!entry.invoked && entry.at <= elapsed) {
				return entry;
			} else if (entry.at > elapsed) {
				break;
			}
		}
	},

	_doEvent: function(event) {
		this['_' + event.event].call(this, event.args);
		event.invoked = true;
	},

	_positionShip: function(ship) {
		this._shipY = this._shipY || 5;
		ship.position = new geom.Point(20, this._shipY);
		this._shipY += ship.contentSize.height + 10;
	},

	_spawn: function(config) {
		var ship = new config.type();
		ship.tag = config.id;
		this._positionShip(ship);
		//ship.runAction(new EmergeFrom(config.from));
		this.addChild(ship);
	},

	update: function(dt) {
		this.elapsed += Math.round(dt * 1000);

		var nextEvent = this._findNextEvent(this.script, this.elapsed);

		if (nextEvent) {
			this._doEvent(nextEvent);
		}
	}
});

module.exports = BlastDownChartLayer;

