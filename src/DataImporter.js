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

