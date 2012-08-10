var totalTime = 5;
var RallyDataStore = require('./rally/RallyDataManager');


function DataImporter() {
}

var events = {
    created:function addCreatedEvent(snapshot) {
        var typeDepth = Math.min(snapshot._ItemHierarchy.length - 1, 4);
        //yes yes this shouldnt be here I know.


        var types = ["Mother","PIHigh","PIMid","PILow","Story"];
        if (snapshot._SnapshotNumber === 0) {
            return {
                at: totalTime * 0.1,
                event: 'spawn',
                args: {
                    type: types[typeDepth],
                    id:snapshot.ObjectID,
                    from: snapshot.Parent,
                    name: snapshot.Name,
                    snapshot:snapshot
                }
            }
        }
    },

    shoot:function(snapshot) {
        if(snapshot.PercentDoneByStoryCount === 1 )
        {
            return  {
                at: totalTime * 1.30,
                event: 'shoot',
                args: snapshot.ObjectID
            }
        }
    },
    blocked:function addBlockedEvent(snapshot) {
        if (snapshot.Blocked) {
            return {
                at: totalTime * 0.78,
                event:'strengthen',
                args:{
                    id:snapshot.ObjectID,
                    snapshot:snapshot

                }
            };
        } else if (snapshot._PreviousValues.Blocked) {
            return {
                at: totalTime * 0.78,
                event:'strengthen',
                args:{
                    id:snapshot.ObjectID,
                    snapshot:snapshot
                }
            };
        }
    }
};


function translate(snapshot) {
    var result = [];
    Ext.Object.each(events, function(key, value) {
        var event = value(snapshot);
        if (event) {
            result.push(event);
        }
    });
    return result;
}
DataImporter.prototype.onDataReady = function(callback) {
    function format(response) {
        var results = Ext.JSON.decode(response.responseText).Results;
        console.log(results);
        console.log(results.pop());
        var formatted = [
            {
                at: totalTime * 0.02,
                event: 'spawn',
                args: {
                    type: 'Mother',
                    id: 'PI1',
                    name: 'Mother Strategy'
                }
            }
        ];
        Ext.Array.each(results, function(snapshot) {
            console.log(snapshot._Type[snapshot._Type.length-1]);
            if(snapshot._Type[snapshot._Type.length+1]=="Task"){
                debugger;
                return;
            }
            formatted = formatted.concat(translate(snapshot));
        });
        formatted.push({
            at: totalTime * 1.40,
            event: 'levelClear'
        });
        console.log(formatted);

        callback(formatted);
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