var StoryShip = require('/StoryShip');

function getData() {
	return [{
		at: 500,
		event: 'spawn',
		args: {
			type: StoryShip,
			id: 'S1',
			title: 'first safari story'
		}
	},
	{
		at: 1200,
		event: 'spawn',
		args: {
			type: StoryShip,
			id: 'S2',
			title: 'another story'
		}
	},
	{
		at: 1500,
		event: 'spawn',
		args: {
			type: StoryShip,
			id: 'S3',
			title: 'another story'
		}
	},
	{
		at: 1800,
		event: 'spawn',
		args: {
			type: StoryShip,
			id: 'S4',
			title: 'another story'
		}
	},
	{
		at: 3400,
		event: 'spawn',
		args: {
			type: StoryShip,
			id: 'S5',
			title: 'another story'
		}
	},
	{
		at: 5000,
		event: 'shoot',
		args: 'S5'
	},
	{
		at: 6500,
		event: 'shoot',
		args: 'S3'
	},
	{
		at: 7800,
		event: 'shoot',
		args: 'S1'
	},
	{
		at: 10000,
		event: 'shoot',
		args: 'S2'
	},
	{
		at: 12000,
		event: 'shoot',
		args: 'S4'
	}];
}

function DataImporter() {}

DataImporter.prototype.onDataReady = function(callback) {
	callback(getData());
};

module.exports = DataImporter;

