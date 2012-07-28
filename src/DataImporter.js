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
		at: 3.2,
		event: 'spawn',
		args: {
			type: 'PI',
			id: 'PI2',
			from: 'PI1',
			title: 'first child PI'
		}
	},
	{
		at: 5.5,
		event: 'spawn',
		args: {
			type: 'Story',
			id: 'S1',
			from: 'PI2',
			title: 'first story'
		}
	},
	{
		at: 9.8,
		event: 'spawn',
		args: {
			type: 'Story',
			id: 'S2',
			from: 'PI2',
			title: 'another story'
		}
	},
	{
		at: 14,
		event: 'shoot',
		args: 'S2'
	},
	{
		at: 17,
		event: 'shoot',
		args: 'S1'
	},
	{
		at: 21,
		event: 'shoot',
		args: 'PI2'
	},
	{
		at: 22,
		event: 'shoot',
		args: 'PI1'
	}];
}

function DataImporter() {}

DataImporter.prototype.onDataReady = function(callback) {
	callback(getData());
};

module.exports = DataImporter;

