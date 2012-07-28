var Vector = require('../../src/geometry/Vector');
var Point = require('geometry').Point;

describe("Vector", function() {

	describe("construction", function() {
		it("should default to 0x0", function() {
			var vec = new Vector();
			expect(vec.x).toEqual(0);
			expect(vec.y).toEqual(0);
		});

		it("should set itself to the constructor args", function() {
			var x = 7;
			var y = 12;

			var vec = new Vector(x,y);
			expect(vec.x).toEqual(x);
			expect(vec.y).toEqual(y);
		});
	});

	describe("immutability", function() {
		it("should be immutable", function() {
			var x = 7, y = 12, vec = new Vector(x,y);
			vec.x = 44;
			vec.y = 1222;

			expect(vec.x).toEqual(x);
			expect(vec.y).toEqual(y);
		});
	});

	describe("equals", function() {
		it("should be equal to itself", function() {
			var vec = new Vector(3, 4);

			expect(vec.equals(vec)).toBe(true);
		});

		it("should equal another vec with the same points", function() {
			var vec1 = new Vector(3,5);
			var vec2 = new Vector(3,5);

			expect(vec1.equals(vec2)).toBe(true);
		});

		it("should not be equal to another vec with different points", function() {
			var vec1 = new Vector(3,5);
			var vec2 = new Vector(4,9);

			expect(vec1.equals(vec2)).toBe(false);
		});

		it("should not be equal to null", function() {
			var vec1 = new Vector(3,4);

			expect(vec1.equals(null)).toBe(false);
		});

		it("should not be equal to undefined", function() {
			var vec1 = new Vector(3,4);

			expect(vec1.equals(undefined)).toBe(false);
		});

		it("should be equal to an equivalent vanilla object", function() {
			var vec1 = new Vector(3,4);

			expect(vec1.equals({ x: 3, y: 4})).toBe(true);
		});

		it("should be equal to a cocos Point", function() {
			var vec = new Vector(3, 4);
			var point = new Point(3, 4);

			expect(vec.equals(point)).toBe(true);
		});
	});

	describe("operations", function() {
		it("should clone", function() {
			var p1 = new Vector(3, 4);
			var p2 = p1.clone();

			expect(p2.x).toEqual(p1.x);
			expect(p2.y).toEqual(p1.y);
			expect(p1 === p2).toBe(false);
		});

		it("should add", function() {
			var p = new Vector(3, 4);
			var p2 = new Vector(5, 6);
			var p3 = p.add(p2);

			expect(p3.x).toEqual(p.x + p2.x);
			expect(p3.y).toEqual(p.y + p2.y);

			var x = 4;
			var y = 6;
			var p4 = p.add(x, y);

			expect(p4.x).toEqual(p.x + x);
			expect(p4.y).toEqual(p.y + y);
		});

		it("should add when the other vec has a zero", function() {
			var p = new Vector(2, 3);
			var p2 = new Vector(0, 4);

			var p3 = p.add(p2);

			expect(p3.x).toEqual(2);
			expect(p3.y).toEqual(7);
		});

		it("should subtract", function() {
			var p = new Vector(3, 4);
			var p2 = new Vector(5, 6);
			var p3 = p.subtract(p2);

			expect(p3.x).toEqual(p.x - p2.x);
			expect(p3.y).toEqual(p.y - p2.y);

			var x = 4;
			var y = 6;
			var p4 = p.subtract(x, y);

			expect(p4.x).toEqual(p.x - x);
			expect(p4.y).toEqual(p.y - y);

			var p5 = p.delta(p3);

			expect(p5.x).toEqual(p.x - p3.x);
			expect(p5.y).toEqual(p.y - p3.y);
		});

		it("should subtract when the other vec has a zero", function() {
			var p = new Vector(3, 4);
			var p2 = new Vector(5, 0);
			var p3 = p.subtract(p2);

			expect(p3.x).toEqual(p.x - p2.x);
			expect(p3.y).toEqual(p.y - p2.y);
		});

		it('should negate', function() {
			var p = new Vector(3, 0);
			var n = p.negate();

			expect(n.x).toEqual(-p.x);
			expect(n.y).toEqual(-p.y);
		});
		it('should multiply', function() {
			var p = new Vector(3, 4);
			var scale = 3;
			var s = p.multiply(scale);

			expect(s.x).toEqual(p.x * scale);
			expect(s.y).toEqual(p.y * scale);
		});

		it('should dot', function() {
			var p = new Vector(0, 4);
			var p2 = new Vector(8, 12);

			var dot = p.dot(p2);

			expect(dot).toEqual(p.x * p2.x + p.y * p2.y);
		});

		it('should return the distanceFrom', function() {
			var p = new Vector(5, 5);
			var p2 = new Vector(5, 10);

			var actualDistance = p.distanceFrom(p2);

			expect(actualDistance).toBe(5);

			var otherWay = p2.distanceFrom(p);

			expect(otherWay).toBe(5);

			// more complex example, classic 3,4,5 triangle
			var p3 = new Vector(1, 1);
			var p4 = new Vector(4, 5);

			expect(p3.distanceFrom(p4)).toBe(5);
		});

		it('should return the degreeAngleFrom', function() {
			var other = new Vector(100, 100);
			var p = new Vector(10, 10);

			var angle = p.degreeAngleFrom(other);

			expect(angle).toBe(225);

			angle = other.degreeAngleFrom(p);
			expect(angle).toBe(45);
		});
	});
});

