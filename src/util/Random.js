function isInteger(num) {
	return num === (num | 0);
}

var _ = require('./underscore-min');

var Random = {
	rand: function(minOrMax, maxOrUndefined, dontFloor) {
		if (_.isUndefined(dontFloor)) {
			dontFloor = false;
		}

		var min = _.isNumber(maxOrUndefined) ? minOrMax: 0;
		var max = _.isNumber(maxOrUndefined) ? maxOrUndefined: minOrMax;

		var range = max - min;

		var result = Math.random() * range + min;
		if (isInteger(min) && isInteger(max) && !dontFloor) {
			return Math.floor(result);
		} else {
			return result;
		}
	},

	coin: function() {
		return this.rand(0, 2) === 0;
	}
};

module.exports = Random;

