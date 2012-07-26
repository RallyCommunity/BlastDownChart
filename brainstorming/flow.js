var dataImporter = require('/dataImporter');
var Player = require('/Player');
var MotherShip = require('/MotherShip');
var PIShip = require('/PIShip');
var StoryShip = require('/StoryShip');

function BurndownChart(script) {
	add(Player);

	this.script = script;
	this.scheduleUpdate();
	this.elapsed = 0;
}

BurndownChart.inherit(Layer, {
	update: function(dt) {
		this.elapsed += Math.round(dt * 1000);

		var nextEvent = this.findNextEvent(this.elapsed);

		if(nextEvent) {
			this.doEvent(nextEvent);
		}
	},

	findNextEvent: function(elapsed) {
		for(var i = 0; i < this.script.length; ++i) {
			var entry = this.script[i];

			if(!entry.invoked && entry.at <= elapsed) {
				return entry;
			} else if(entry.at > elapsed) {
				break;
			}
		}
	},

	doEvent: function(event) {
		this['event_' + event.event].call(this, event.args);
	},

	event_block: function(id) {
		var ship = this.getShipById(id);

		if(ship) {
			ship.runAction(new BecomeBlocked());
		}
	},
	event_unblock: function(id) {
		var ship = this.getShipById(id);

		if(ship) {
			ship.runAction(new BecomeUnblocked());
		}
	},
	event_spawn: function(config) {
		var ship = new config.type();
		ship.addTag('id', config.id);
		this.positionShip(ship);
		ship.runAction(new EmergeFrom(config.from));
		this.addChild(ship);
	},
	event_shoot: function(id) {
		var ship = this.getShipById(id);

		if(ship) {
			this.player.runAction(new Sequence(
				new MoveToX(ship.position.x),
				new Delay(200),
				new Shoot()
			));
		}
	}
});	

function main() {
	events.addListener(dataImporter, 'scriptReady', function(dataImporter) {
		events.addListener(director, 'ready', function(director) {
			var scene = new Scene();
			var layer = new BurndownChart(dataImporter.script);
			scene.addChild(layer);
			director.replaceScene(scene);
		});
	});

	director.runPreloadScene();
}

var script = [
	{
		at: 1000,
		event: 'spawn',
		args: {
			type: MotherShip,
			id: 'PI123',
			title: 'Mother Strategy: H&S'
		}
	},
	{
		at: 2500,
		event: 'spawn',
		args: {
			type: StoryShip,
			from: 'PI123',
			id: 'S345'
			title: 'first H&S story'
		}
	},
	{
		at: 4800,
		event: 'block',
		args: 'S345'
	},
	{
		at: 6000,
		event: 'unblock',
		args: 'S345'
	},
	{
		at: 8000,
		event: 'shoot',
		args: 'S345'
	}
];




