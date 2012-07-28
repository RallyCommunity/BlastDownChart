var Angles = require('../../src/util/Angles');

describe("Angles", function() {
	it('should use zero if no params given', function() {
		expect(Angles.degreesToRadians()).toBe(0);
		expect(Angles.radiansToDegrees()).toBe(0);
	});

	it('should convert degrees to radians', function() {
		var degrees = 100;
		var radians = Angles.degreesToRadians(degrees);

		expect(radians).toEqual(degrees * Math.PI / 180);
	});

	it('should convert radians to degrees', function() {
		var radians = 4;
		var degrees = Angles.radiansToDegrees(radians);

		expect(degrees).toEqual(radians * 180 / Math.PI);
	});
});

