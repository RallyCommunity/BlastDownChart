// var sdk = require('./util/sdk-debug');
// var Ext = sdk.Ext;
// var Rally = sdk.Rally;
// 
// Ext.define('BDC.DataImporter', {
// 	constructor: function() {
// 		Ext.create('Rally.data.WsapiDataStore', {
// 			model: 'UserStory',
// 			listeners: {
// 				load: function(store, data, success) {
// 					var script = this._convertData(data);
// 				}
// 			},
// 			autoLoad: true,
// 			fetch: ['Name', 'ScheduleState'],
// 			filters: [{
// 				property: '_Type',
// 				operator: 'in',
// 				value: ['Defect', 'HierarchicalRequirement']
// 			}]
// 		});
// 	},
// 	
// 	_convertData: function(data) {
// 		var scriptData = [];
// 		
// 		
// 	}
// });
// 
// module.exports = BDC.DataImporter;
var totalTime = 30;

function getData() {
	return [{
		at: totalTime * 0.02,
		event: 'spawn',
		args: {
			type: 'Mother',
			id: 'PI1',
			name: 'Mother Strategy'
		}
	},
	{
		at: totalTime * 0.1,
		event: 'spawn',
		args: {
			type: 'PIMid',
			id: 'PI2',
			from: 'PI1',
			name: 'first child PI'
		}
	},
	{
		at: totalTime * 0.2,
		event: 'spawn',
		args: {
			type: 'Story',
			id: 'S1',
			from: 'PI2',
			name: 'first story'
		}
	},
	{
		at: totalTime * 0.22,
		event: 'spawn',
		args: {
			type: 'PIHigh',
			id: 'PI4',
			from: 'PI1',
			name: 'big PI'
		}
	},
	{
		at: totalTime * 0.25,
		event: 'spawn',
		args: {
			type: 'PILow',
			id: 'PI3',
			from: 'PI1',
			name: 'another PI'
		}
	},
	{
		at: totalTime * 0.3,
		event: 'spawn',
		args: {
			type: 'Story',
			id: 'S2',
			from: 'PI2',
			name: 'another story'
		}
	},
	{
		at: totalTime * 0.45,
		event: 'spawn',
		args: {
			type: 'Story',
			id: 'S3',
			from: 'PI3',
			name: 'yet more story work'
		}
	},
	{
		at: totalTime * 0.6,
		event: 'shoot',
		args: 'S2'
	},
	{
		at: totalTime * 0.7,
		event: 'spawn',
		args: {
			type: 'Story',
			id: 'S4',
			from: 'PI3',
			name: 'and another story'
		}
	},
	{
		at: totalTime * 0.75,
		event: 'shoot',
		args: 'S4'
	},
	{
		at: totalTime * 0.78,
		event: 'spawn',
		args: {
			type: 'Story',
			id: 'S5',
			from: 'PI3',
			name: 'the final story'
		}
	},
	{
		at: totalTime * 0.93,
		event: 'shoot',
		args: 'S5'
	},
	{
		at: totalTime * 1.03,
		event: 'shoot',
		args: 'S3'
	},
	{
		at: totalTime * 1.07,
		event: 'shoot',
		args: 'PI3'
	},
	{
		at: totalTime * 1.18,
		event: 'shoot',
		args: 'S1'
	},
	{
		at: totalTime * 1.23,
		event: 'shoot',
		args: 'PI2'
	},
	{
		at: totalTime * 1.30,
		event: 'shoot',
		args: 'PI4'
	},
	{
		at: totalTime * 1.37,
		event: 'shoot',
		args: 'PI1'
	},
	{
		at: totalTime * 1.45,
		event: 'levelClear'
	}];
}

var IDCounter = 4;

function addTrack(motherID, high, mid, low, story) {
	var entries = [];

	for(var h = 0; h < high; ++h) {
		var hID = IDCounter++;
		entries.push({
			event: 'spawn',
			args: {
				type: 'PIHigh',
				id: 'PI' + hID,
				name: 'PI' + hID,
				from: motherID
			}
		});

		for(var m = 0; m < mid; ++m) {
			var mID = IDCounter++;
			entries.push({
				event: 'spawn',
				args: {
					type: 'PIMid',
					id: 'PI' + mID,
					name: 'PI' + mID,
					from: 'PI' + hID
				}
			});

			for(var l = 0; l < low; ++l) {
				var lID = IDCounter++;
				entries.push({
					event: 'spawn',
					args: {
						type: 'PILow',
						id: 'PI' + lID,
						name: 'PI' + lID,
						from: 'PI' + mID
					}
				});

				for(var s = 0; s < story; ++s) {
					var sID = IDCounter++;
					entries.push({
						event: 'spawn',
						args: {
							type: 'Story',
							id: 'S' + sID,
							name: 'S' + sID,
							from: 'PI' + lID
						}
					});
				}
			}
		}
	}

	return entries;
}

function getData2() {
	var motherID = 'PI1';

	var totalTime = 20;

	var script = [{
		at: totalTime * 0.02,
		event: 'spawn',
		args: {
			type: 'Mother',
			id: motherID,
			name: 'Mother Strategy'
		}
	}];

	script = script.concat(addTrack(motherID, 1, 1, 1, 1));
	//script = script.concat(addTrack(motherID, 1, 2, 2, 3));
	//script = script.concat(addTrack(motherID, 1, 1, 3, 4));
	//script = script.concat(addTrack(motherID, 1, 2, 2, 5));
	//script = script.concat(addTrack(motherID, 1, 1, 1, 7));
	//script = script.concat(addTrack(motherID, 1, 2, 2, 2));
	//script = script.concat(addTrack(motherID, 1, 2, 2, 5));
	//script = script.concat(addTrack(motherID, 1, 2, 2, 5));
	//script = script.concat(addTrack(motherID, 1, 1, 3, 4));
	//script = script.concat(addTrack(motherID, 1, 2, 2, 5));

	script.forEach(function(entry, i) {
		entry.at = totalTime * (i / script.length);
	});

	var reversed = ([].concat(script)).reverse();

	reversed.forEach(function(entry, i) {
		script.push({
			at: totalTime++,
			event: 'shoot',
			args: entry.args.id
		});
	});

	script.push({
		at: totalTime + 4.33,
		event: 'levelClear'
	});

	return script;
}

function DataImporter() {}

DataImporter.prototype.onDataReady = function(callback) {
	callback(getData2());
};

module.exports = DataImporter;

