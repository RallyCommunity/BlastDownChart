var geom = require('geometry');
var Point = geom.Point;
var Rect = geom.Rect;
var _ = require('../util/underscore-min');

var Column = require('./Column');
var Region = require('./Region');

var Textures = require('../Textures');

function ShipPlacer(contentSize, playFieldYOffset) {
	// hardcode to 10 columns, at least for now
	var columnCount = 10;

	var columnSize = {
		width: contentSize.width / columnCount,
		height: contentSize.height
	};

	this.columns = [];
	for(var i = 0; i < columnCount; ++i) {
		var columnRect = new Rect(columnSize.width * i, playFieldYOffset, columnSize.width, columnSize.height);
		this.columns.push(new Column(this._createRegions(columnRect)));
	}
}

ShipPlacer.prototype = {
	_createRegions: function(columnRect) {
		var topRect = new Rect(columnRect.origin.x,
													 columnRect.origin.y, 
													 columnRect.size.width, 
													 columnRect.size.height * .28);
		var top = new Region(topRect, Textures.PIShipHigh.contentSize);

		var midRect = new Rect(columnRect.origin.x, 
													 topRect.origin.y - topRect.size.height + 27,
													 columnRect.size.width, 
													 columnRect.size.height * .24);
		var mid = new Region(midRect, Textures.PIShipMid.contentSize);

		var lowRect = new Rect(columnRect.origin.x,
															midRect.origin.y - midRect.size.height,
															columnRect.size.width,
															columnRect.size.height * .25);
		var low = new Region(lowRect, Textures.PIShipLow.contentSize);

		var storyRect = new Rect(columnRect.origin.x,
														 lowRect.origin.y - lowRect.size.height - 15,
														 columnRect.size.width,
														 columnRect.size.height * .25);
		var story = new Region(storyRect, Textures.StoryShip.contentSize);

		console.log(topRect.origin.y, midRect.origin.y, lowRect.origin.y, storyRect.origin.y);
		console.log(Textures.PIShipHigh.contentSize.height, Textures.PIShipMid.contentSize.height, Textures.PIShipLow.contentSize.height, Textures.StoryShip.contentSize.height);

		return {
			PIHigh: top,
			PIMid: mid,
			PILow: low,
			Story: story
		};
	},

	_getColumnForShip: function(ship) {
		var foundColumn;
		_.each(this.columns, function(column) {
			if(column.containsNode(ship)) {
				foundColumn = column;
			}
		});
		return foundColumn;
	},

	_findEmptyColumn: function() {
		var foundColumn;
		_.each(this.columns, function(column) {
			if(column.nodeCount === 0) {
				foundColumn = column;
			}
		});

		return foundColumn;
	},

	positionShip: function(ship, parentShip) {
		var column = this._getColumnForShip(parentShip);

		if(!column) {
			// parent is the mother ship, so find an empty column
			column = this._findEmptyColumn();
		} 
		return column.addNode(ship);
	}
};

module.exports = ShipPlacer;
