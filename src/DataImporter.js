var StoryShip = require('/nodes/StoryShip');

function getData() {
	return [{
		at: 0.5,
		event: 'spawn',
		args: {
			type: StoryShip,
			id: 'S1',
			title: 'first safari story'
		}
	},
	{
		at: 1.2,
		event: 'spawn',
		args: {
			type: StoryShip,
			id: 'S2',
			title: 'another story'
		}
	},
	{
		at: 1.5,
		event: 'spawn',
		args: {
			type: StoryShip,
			id: 'S3',
			title: 'another story'
		}
	},
	{
		at: 1.8,
		event: 'spawn',
		args: {
			type: StoryShip,
			id: 'S4',
			title: 'another story'
		}
	},
	{
		at: 3.4,
		event: 'spawn',
		args: {
			type: StoryShip,
			id: 'S5',
			title: 'another story'
		}
	},
	{
		at: 5,
		event: 'shoot',
		args: 'S5'
	},
	{
		at: 6.5,
		event: 'shoot',
		args: 'S3'
	},
	{
		at: 7.8,
		event: 'shoot',
		args: 'S1'
	},
	{
		at: 10,
		event: 'shoot',
		args: 'S2'
	},
	{
		at: 12,
		event: 'shoot',
		args: 'S4'
	}];
}

function DataImporter() {}

DataImporter.prototype.onDataReady = function(callback) {
	callback(getData());
};

module.exports = DataImporter;

