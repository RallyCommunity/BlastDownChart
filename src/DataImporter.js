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
var totalTime = 10;

function getData() {
	return [{
		at: totalTime * 0.02,
		event: 'spawn',
		args: {
			type: 'Mother',
			id: 'PI1',
			title: 'Mother Strategy'
		}
	},
	{
		at: totalTime * 0.1,
		event: 'spawn',
		args: {
			type: 'PI',
			id: 'PI2',
			from: 'PI1',
			title: 'first child PI'
		}
	},
	{
		at: totalTime * 0.2,
		event: 'spawn',
		args: {
			type: 'Story',
			id: 'S1',
			from: 'PI2',
			title: 'first story'
		}
	},
	{
		at: totalTime * 0.3,
		event: 'spawn',
		args: {
			type: 'Story',
			id: 'S2',
			from: 'PI2',
			title: 'another story'
		}
	},
	{
		at: totalTime * 0.4,
		event: 'strengthen',
		args: 'S1'
	},
	{
		at: totalTime * 0.6,
		event: 'shoot',
		args: 'S2'
	},
	{
		at: totalTime * 0.7,
		event: 'weaken',
		args: 'S1'
	},
	{
		at: totalTime * 0.8,
		event: 'shoot',
		args: 'S1'
	},
	{
		at: totalTime * 0.9,
		event: 'shoot',
		args: 'PI2'
	},
	{
		at: totalTime * 1,
		event: 'shoot',
		args: 'PI1'
	}];
}

function DataImporter() {}

DataImporter.prototype.onDataReady = function(callback) {
	callback(getData());
};

module.exports = DataImporter;

