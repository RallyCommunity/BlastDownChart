var Random = require('../../src/util/Random');

describe('Random', function() {
	it('should work with just one max argument', function() {
		var max = 5;
		expect(Random.rand(max)).toBeLessThan(max);
		expect(Random.rand(max)).toBeGreaterThan(-1);
	});

	it('should work with a min and max integer arguments', function() {
		var min = 4;
		var max = 10;

		var result = Random.rand(min, max);

		// should be an integer
		expect(result).toEqual(result | 0);
		expect(result).toBeGreaterThan(min-1);
		expect(result).toBeLessThan(max);
	});

	it('should work with min and max float arguments', function() {
		var min = 1.2345;
		var max = 124.343434;

		var result = Random.rand(min, max);
		expect(toString.call(result)).toEqual('[object Number]');
		expect(result).toBeGreaterThan(min - .1);
		expect(result).toBeLessThan(max);
	});

	it('should do coin flips', function() {
		expect(Random.coin()).toBeGreaterThan(-1);
		expect(Random.coin()).toBeLessThan(2);
	});
});
