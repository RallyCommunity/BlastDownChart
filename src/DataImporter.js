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
			type: 'PI',
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
		at: totalTime * 0.25,
		event: 'spawn',
		args: {
			type: 'PI',
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
		at: totalTime * 0.92,
		event: 'shoot',
		args: 'S4'
	},
	{
		at: totalTime * 0.95,
		event: 'spawn',
		args: {
			type: 'Story',
			id: 'S5',
			from: 'PI3',
			name: 'the final story'
		}
	},
	{
		at: totalTime * 1.1,
		event: 'shoot',
		args: 'S5'
	},
	{
		at: totalTime * 1.2,
		event: 'shoot',
		args: 'S3'
	},
	{
		at: totalTime * 1.24,
		event: 'shoot',
		args: 'PI3'
	},
	{
		at: totalTime * 1.35,
		event: 'shoot',
		args: 'S1'
	},
	{
		at: totalTime * 1.40,
		event: 'shoot',
		args: 'PI2'
	},
	{
		at: totalTime * 1.47,
		event: 'shoot',
		args: 'PI1'
	},
	{
		at: totalTime * 1.57,
		event: 'levelClear'
	}];
}

function DataImporter() {}

DataImporter.prototype.onDataReady = function(callback) {
	callback(getData());
};

module.exports = DataImporter;

