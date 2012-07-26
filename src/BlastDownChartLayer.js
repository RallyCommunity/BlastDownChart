var cocos = require('cocos2d');
var geom = require('geometry');

var Player = require('/Player');


function BlastDownChartLayer(script) {
	BlastDownChartLayer.superclass.constructor.call(this);

	var winSize = cocos.Director.sharedDirector.winSize;

	var player = new Player();
	player.position = new geom.Point(winSize.width / 2, 40);
	this.addChild(player);
	this.player = player;

	this.script = script;
	this.elapsed = 0;

	this.scheduleUpdate();
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
		var winSize = cocos.Director.sharedDirector.winSize;

		this._shipY = this._shipY || winSize.height - 20;
		ship.position = new geom.Point(60, this._shipY);
		this._shipY -= ship.contentSize.height + 20;
	},

	_setBobbing: function(ship) {
		var jumpRight = new cocos.actions.JumpBy({ duration: 0.5, delta: new geom.Point(14, 0),   height: -8, jumps: 1 });
		var jumpLeft = jumpRight.reverse();
		var jumpSequence = new cocos.actions.Sequence({actions: [jumpRight, jumpLeft] });

		ship.runAction(new cocos.actions.RepeatForever(jumpSequence));
	},

	_spawn: function(config) {
		var ship = new config.type();
		ship.tag = config.id;
		this._positionShip(ship);
		this._setBobbing(ship);
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

