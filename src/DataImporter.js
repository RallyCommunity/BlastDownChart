function getData() {
	return [{
		at: 0.5,
		event: 'spawn',
		args: {
			type: 'Mother',
			id: 'PI1',
			title: 'Mother Strategy'
		}
	},
	{
		at: 1.2,
		event: 'spawn',
		args: {
			type: 'PI',
			id: 'PI2',
			from: 'PI1',
			title: 'first child PI'
		}
	},
	{
		at: 1.5,
		event: 'spawn',
		args: {
			type: 'Story',
			id: 'S1',
			from: 'PI2',
			title: 'first story'
		}
	},
	{
		at: 1.8,
		event: 'spawn',
		args: {
			type: 'Story',
			id: 'S2',
			from: 'PI2',
			title: 'another story'
		}
	},
	{
		at: 5,
		event: 'shoot',
		args: 'S2'
	},
	{
		at: 6.5,
		event: 'shoot',
		args: 'S1'
	},
	{
		at: 7.8,
		event: 'shoot',
		args: 'PI2'
	},
	{
		at: 10,
		event: 'shoot',
		args: 'PI1'
	}];
}

function DataImporter() {}

DataImporter.prototype.onDataReady = function(callback) {
	callback(getData());
};

module.exports = DataImporter;

