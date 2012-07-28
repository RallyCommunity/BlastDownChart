var Angles = {
	degreesToRadians: function(degrees) {
		degrees = degrees || 0;
		return degrees * Math.PI / 180;
	},

	radiansToDegrees: function(radians) {
		radians = radians || 0;
		return radians * 180 / Math.PI;
	}
};

module.exports = Angles;


