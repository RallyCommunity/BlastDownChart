var cocos = require('cocos2d');
var geom = require('geometry');

var Player = require('/Player');
var Shoot = require('/actions/Shoot');

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
	findShipById: function(id) {
		// TODO: this really should be using tags
		return this.children.filter(function(child) {
			return child._id === id;
		})[0];
	},

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

		this._shipXs = this._shipXs || [60, 150, 240, 330];

		this._shipY = this._shipY || winSize.height - 20;
		var xi = Math.floor(Math.random() * this._shipXs.length);

		ship.position = new geom.Point(this._shipXs[xi], this._shipY);
		ship.centerX = ship.position.x + ship.contentSize.width;
		this._shipY -= ship.contentSize.height + 20;
	},

	_setBobbing: function(ship) {
		var jumpRight = new cocos.actions.JumpBy({
			duration: 0.5,
			delta: new geom.Point(14, 0),
			height: - 8,
			jumps: 1
		});
		var jumpLeft = jumpRight.reverse();

		var jumpSequence = new cocos.actions.Sequence({
			actions: [jumpRight, jumpLeft]
		});

		ship.runAction(new cocos.actions.RepeatForever(jumpSequence));
	},

	_spawn: function(config) {
		var ship = new config.type();
		ship._id = config.id;
		this._positionShip(ship);
		this._setBobbing(ship);
		//ship.runAction(new EmergeFrom(config.from));
		this.addChild(ship);
	},

	_shoot: function(id) {
		var ship = this.findShipById(id);

		if (ship) {
			this.player.runAction(new cocos.actions.Sequence({
				actions: [ 
					new cocos.actions.MoveTo({ 
						duration: 1, 
						position: new geom.Point(ship.position.x, this.player.position.y)
					}), 
					new cocos.actions.DelayTime(0.2), 
					new Shoot(id)
				]
			}));
		} else {
			console.log('no ship found with id: ' + id);
		}
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

