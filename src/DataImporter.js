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
var RallyDataStore = require('./rally/RallyDataManager');


function DataImporter() {
}
function translate(snapshot){

}
DataImporter.prototype.onDataReady = function(callback) {
    function format(response) {
        var results = Ext.JSON.decode(response.responseText).Results;
        console.log(results);
        console.log(results.pop());
        callback(results);
    }

    RallyDataStore.getData(format);
};

module.exports = DataImporter;


//function getData() {
//	return [{
//		at: totalTime * 0.02,
//		event: 'spawn',
//		args: {
//			type: 'Mother',
//			id: 'PI1',
//			name: 'Mother Strategy'
//		}
//	},
//	{
//		at: totalTime * 0.1,
//		event: 'spawn',
//		args: {
//			type: 'PI',
//			id: 'PI2',
//			from: 'PI1',
//			name: 'first child PI'
//		}
//	},
//	{
//		at: totalTime * 0.2,
//		event: 'spawn',
//		args: {
//			type: 'Story',
//			id: 'S1',
//			from: 'PI2',
//			name: 'first story'
//		}
//	},
//	{
//		at: totalTime * 0.25,
//		event: 'spawn',
//		args: {
//			type: 'PI',
//			id: 'PI3',
//			from: 'PI1',
//			name: 'another PI'
//		}
//	},
//	{
//		at: totalTime * 0.3,
//		event: 'spawn',
//		args: {
//			type: 'Story',
//			id: 'S2',
//			from: 'PI2',
//			name: 'another story'
//		}
//	},
//	{
//		at: totalTime * 0.45,
//		event: 'spawn',
//		args: {
//			type: 'Story',
//			id: 'S3',
//			from: 'PI3',
//			name: 'yet more story work'
//		}
//	},
//	{
//		at: totalTime * 0.6,
//		event: 'shoot',
//		args: 'S2'
//	},
//	{
//		at: totalTime * 0.7,
//		event: 'spawn',
//		args: {
//			type: 'Story',
//			id: 'S4',
//			from: 'PI3',
//			name: 'and another story'
//		}
//	},
//	{
//		at: totalTime * 0.75,
//		event: 'shoot',
//		args: 'S4'
//	},
//	{
//		at: totalTime * 0.78,
//		event: 'spawn',
//		args: {
//			type: 'Story',
//			id: 'S5',
//			from: 'PI3',
//			name: 'the final story'
//		}
//	},
//	{
//		at: totalTime * 0.93,
//		event: 'shoot',
//		args: 'S5'
//	},
//	{
//		at: totalTime * 1.03,
//		event: 'shoot',
//		args: 'S3'
//	},
//	{
//		at: totalTime * 1.07,
//		event: 'shoot',
//		args: 'PI3'
//	},
//	{
//		at: totalTime * 1.18,
//		event: 'shoot',
//		args: 'S1'
//	},
//	{
//		at: totalTime * 1.23,
//		event: 'shoot',
//		args: 'PI2'
//	},
//	{
//		at: totalTime * 1.30,
//		event: 'shoot',
//		args: 'PI1'
//	},
//	{
//		at: totalTime * 1.40,
//		event: 'levelClear'
//	}];
//}