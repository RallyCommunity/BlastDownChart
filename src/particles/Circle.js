var cocos = require('cocos2d');
var Node = cocos.nodes.Node;

var geom = require('geometry');
var Rect = geom.Rect;




function Circle(config) {
	Circle.superclass.constructor.call(this);

	config = config || {};
	this.color = config.color || [0, 0, 0, 255];
	this.radius = config.radius;
	this.rect = config.rect || new Rect(0, 0, 0, 0);
}

Circle.inherit(Node, {
	_colorToCss: function() {
		var r = Math.round;

		return 'rgba(' + r(this.color[0])
		 + ',' + r(this.color[1])
		 + ',' + r(this.color[2])
		 + ',' + r(this.color[3]) + ')'; 
	},

	draw: function(ctx, rect) {
		var x = this.position.x,
			y = this.position.y,
			r = this.radius || this.rect.size.width / 2;

		ctx.save();
		ctx.fillStyle = this._colorToCss();
		ctx.beginPath();
		ctx.arc(x, y, r, 0 , 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
});

module.exports = Circle;





