var cocos = require('cocos2d');
var Angles = require('../util/Angles');

var _pi = Math.PI;
var _twoPi = _pi * 2;
var _piOver2 = _pi / 2;

function Vector(x, y) {
	this._x = x || 0;
	this._y = y || 0;
}

Vector.prototype = {
	clone: function() {
		return new Vector(this.x, this.y);
	},

	equals: function(other) {
		if (other) {
			return (other === this) || 
				(other._x === this._x && other._y === this._y) ||
				(other.x === this._x && other.y == this._y);
		}
		return false;
	},

	add: function(otherVectorOrNumber, numberOrUndefined) {
		var x, y;

		if (typeof otherVectorOrNumber.x === 'number') {
			x = otherVectorOrNumber.x;
		} else {
			x = otherVectorOrNumber || 0;
		}

		if (typeof otherVectorOrNumber.y === 'number') {
			y = otherVectorOrNumber.y;
		} else {
			y = numberOrUndefined || 0;
		}

		return new Vector(this.x + x, this.y + y);
	},

	subtract: function(otherVectorOrNumber, numberOrUndefined) {
		if (typeof otherVectorOrNumber.x === 'number') {
			x = otherVectorOrNumber.x;
		} else {
			x = otherVectorOrNumber || 0;
		}

		if (typeof otherVectorOrNumber.y === 'number') {
			y = otherVectorOrNumber.y;
		} else {
			y = numberOrUndefined || 0;
		}

		return new Vector(this.x - x, this.y - y);
	},

	negate: function() {
		return new Vector(-this.x, -this.y);
	},

	multiply: function(scalar) {
		return new Vector(this.x * scalar, this.y * scalar);
	},

	round: function() {
		return new Vector(Math.round(this.x), Math.round(this.y));
	},

	dot: function(other) {
		return this.x * other.x + this.y * other.y;
	},

	length: function() {
		return Math.sqrt(this.dot(this));
	},

	normalize: function() {
		return this.multiply(1.0 / this.length());
	},

	distanceFrom: function(other) {
		var delta = this.delta(other);

		return Math.sqrt(delta.dot(delta));
	},

	degreeAngleFrom: function(other) {
		return Angles.radiansToDegrees(this.radianAngleFrom(other));
	},

	radianAngleFrom: function(other) {
		var x = this.x - other.x;
		var y = this.y - other.y;

		// special case for x equals zero, division by zero
		if (x === 0) {
			if (y < 0) {
				return _piOver2 * 3;
			} else {
				return _piOver2;
			}
		}

		// special case for y equals zero, the negative gets lost
		if (y === 0) {
			if (x < 0) {
				return _pi;
			} else {
				return 0;
			}
		}

		var tan = y / x;
		var radians = Math.atan(tan);

		// quad 1
		if (x > 0 && y > 0) {
			return radians;

			// quad 2, add 180
		} else if (x < 0 && y > 0) {
			return radians + _pi;

			// quad 3, add 180
		} else if (x < 0 && y < 0) {
			return radians + _pi;

			// if(x > 0 && y < 0) {
		} else {
			return radians + _twoPi;
		}
	},

	toString: function() {
		return "[" + this._x + "," + this._y + "]";
	}
};

Vector.prototype.delta = Vector.prototype.subtract;

Object.defineProperty(Vector.prototype, "x", {
	get: function() {
		return this._x;
	}
});

Object.defineProperty(Vector.prototype, "y", {
	get: function() {
		return this._y;
	}
});

module.exports = Vector;

