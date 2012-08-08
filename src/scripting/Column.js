var _ = require('../util/underscore-min');

function Column(regions) {
	this.regions = regions;
	this.nodeCount = 0;
}

Column.prototype = {
	_removeNode: function(node) {
		--this.nodeCount;

		node.region.removeNode(node);
		delete node.region;
	},

	containsNode: function(node) {
		return node.region && _.values(this.regions).indexOf(node.region) > -1;
	},

	addNode: function(node) {
		//node.on('destroy', this._removeNode, this);

		var region = this.regions[node._type];

		if(region) {
			++this.nodeCount;
			var position = region.addNode(node);
			node.region = region;
			return position;
		}
	}
};

module.exports = Column;

