var _ = require('../util/underscore-min');
var geom = require('geometry');
var Point = geom.Point;

var Random = require('../util/Random');

function remove(array, item) {
	var index = array.indexOf(item);

	if (index >= 0) {
		array.splice(index, 1);
	}
}

function determineSlots(rect, nodeSize) {
	var slots = [];

	for(var x = 0; x < Math.floor(rect.size.width / nodeSize.width); ++x) {
		for(var y = 0; y < Math.floor(rect.size.height / nodeSize.height); ++y) {
			slots.push({
				entries: [],
				position: new Point(x * nodeSize.width + rect.origin.x + nodeSize.width / 2, y * nodeSize.height + rect.origin.y)
			});
		}
	}

	return slots;
}

function Region(rect, nodeSize) {
	this.slots = determineSlots(rect, nodeSize);
}

Region.prototype = {

	_findSlotForNode: function(node) {
		var foundSlot;
		_.each(this.slots, function(slot) {
			if (slot.entries.indexOf(node) > -1) {
				foundSlot = slot;
			}
		});

		return foundSlot;
	},

	_getNextSlot: function() {
		var leastNodes = Infinity;
		var mostEmptySlot;

		for(var i = 0; i < this.slots.length; ++i) {
			if(this.slots[i].entries.length <= leastNodes) {
				leastNodes = this.slots[i].entries.length;
				mostEmptySlot = this.slots[i];
			}
		}

		return mostEmptySlot;
	},

	addNode: function(node) {
		var slot = this._getNextSlot();

		var c = this.slots.length;

		slot.entries.push(node);
		return new Point(slot.position.x + Random.rand(-15/c, 15/c), slot.position.y + Random.rand(-15/c, 15/c));
	},

	removeNode: function(node) {
		var slot = this._findSlotForNode(node);

		if (slot) {
			remove(slot.entries, node);
		}
	}

};

module.exports = Region;

