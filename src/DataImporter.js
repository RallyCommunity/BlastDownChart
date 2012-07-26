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
	}];
}

function DataImporter() {
}

DataImporter.prototype.onDataReady = function(callback) {
	callback(getData());
};

module.exports = DataImporter;

