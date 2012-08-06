var e = {};


e.getData = function(callback) {
    Ext.onReady(function() {
        var find = {
            "_PreviousValues.PercentDone":{
                $ne:100
            },
            ScheduleState:"Accepted",
            _ItemHierarchy:5401627848

        };
        find = Ext.JSON.encode(find);
        Ext.Ajax.request({
            method:"get",
            url: 'https://rally1.rallydev.com/analytics/1.27/41529001/artifact/snapshot/query.js',
            params:{
                pagesize: "10",
                find:find,
                fields:'["_PreviousValues","ScheduleState","_ItemHierarchy"]',
                sort:'{_ValidFrom:1}',
                hydrate:["ScheduleState"]
            },

            cors:true,
            success:callback
        });
    });
};

module.exports = e;

