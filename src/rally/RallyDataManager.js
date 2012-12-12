var e = {};


e.getData = function(callback) {
    Rally.onReady(function() {
        var find = {
            $and: [
                { _ItemHierarchy: 5683826144 },
                {$or: [
                    {_SnapshotNumber :0 },
                    { "_PreviousValues.Blocked" : {$exists:true} },
                    { PercentDoneByStoryCount : 1}
                ]},
                {$or: [
                    { _Type : 'PortfolioItem' },
                    { _Type : 'HierarchicalRequirement' }
                ]}
            ]};
        find = Ext.JSON.encode(find);

				Ext.create('Rally.data.lookback.SnapshotStore', {
					rawFind: find,
					autoLoad: true,
					limit: 10000,
					listeners: {
						load: function(store, data, success) {
							callback(data);
						}
					}
				});
    });
};

module.exports = e;



