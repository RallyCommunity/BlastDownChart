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
        Ext.Ajax.request({
            method:"get",
            url: 'https://rally1.rallydev.com/analytics/v2.0/service/rally/workspace/41529001/artifact/snapshot/query.js',
            params:{
                pagesize: "10000",
                find:find,
                fields:'true',
                sort:'{_ValidFrom:1}'
            },

            cors:true,
            success:callback
        });
    });
};

module.exports = e;



