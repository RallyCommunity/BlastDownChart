var geom = require('geometry');
var Point = geom.Point;

function remove(array, item) {
	var index = array.indexOf(item);

	if (index >= 0) {
		array.splice(index, 1);
	}
}

function determineSlots(width, height, nodeSize) {
	var slots = [];

	for(var x = 0 x < width / nodeSize.width; ++x) {
		for(var y = 0; y < height / nodeSize.height; ++y) {
			slots.push({
				entries: [],
				position: new Point(x * nodeSize.width, y * nodeSize.height)
			});
		}
	}

	return slots;
}

function Region(width, height, nodeSize) {
	this.slots = determineSlots(width, height, nodeSize);
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

		for(var i = this.slots.length -1; i >= 0; --i) {
			if(this.slots[i].entries.length <= leastNodes) {
				leastNodes = this.slots[i].entries.length;
				mostEmptySlot = this.slots[i];
			}
		}

		return mostEmptySlot;
	},

	containsNode: function(node) {
		return !!this._findSlotForNode(node);
	},

	addNode: function(node) {
		var slot = this._getNextSlot();

		slot.entries.push(node);
		return slot.position;
	},

	removeNode: function(node) {
		var slot = this._findSlotForNode(node);

		if (slot) {
			remove(slot.entries, node);
		}
	}

};

module.exports = Region;

