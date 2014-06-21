QUnit.module("capsule.Vector");

QUnit.test("Checking if it's defined", function(assert) {
	assert.ok(capsule.Vector, "capsule.Vector is defined.");
	assert.equal(typeof capsule.Vector, "function", "capsule.Vector is a function.");
});

QUnit.test("clone", function(assert) {
	var vector = new capsule.Vector();
	var clone  = vector.clone();
	assert.notEqual(vector, clone, "clone function does not return itself.");

	assert.equal(vector.x, clone.x, "clone.x is equal to the original instance.");
	assert.equal(vector.y, clone.y, "clone.y is equal to the original instance.");

	clone.x += 10;
	clone.y += 10;
	assert.notEqual(vector.x, clone.x, "mutating clone.x property does not affect the original instance.");
	assert.notEqual(vector.y, clone.y, "mutating clone.y property does not affect the original instance.");
});

QUnit.test("length, length2", function(assert) {
	var i;
	var vector = new capsule.Vector();
	for (i = 0; i < 100; i += 1) {
		vector.x = 3 * i;
		vector.y = 4 * i;
		assert.equal(vector.length, 5 * i);
		assert.equal(vector.length2, vector.length * vector.length);
	}
	for (i = 1; i < 100; i += 1) {
		vector.length = 5 * i;
		assert.equal(Math.round(vector.x), 3 * i);
		assert.equal(Math.round(vector.y), 4 * i);
	}
});

QUnit.test("angle", function(assert) {
	var vector = new capsule.Vector();

	vector.length = 1
	vector.angle  = Math.PI;
	assert.equal(vector.length, 1);

	vector.x = 1;
	vector.y = 0;
	assert.equal(vector.angle, 0);

	vector.x = Math.sqrt(3) / 2;
	vector.y = 1 / 2;
	assert.equal(vector.angle.toFixed(10), (Math.PI / 6).toFixed(10));

	vector.x = 1 / Math.sqrt(2);
	vector.y = 1 / Math.sqrt(2);
	assert.equal(vector.angle.toFixed(10), (Math.PI / 4).toFixed(10));

	vector.x = 1 / 2;
	vector.y = Math.sqrt(3) / 2;
	assert.equal(vector.angle.toFixed(10), (Math.PI / 3).toFixed(10));

	vector.x = 0;
	vector.y = 1;
	assert.equal(vector.angle.toFixed(10), (Math.PI / 2).toFixed(10));
});

QUnit.test("getDistanceTo, getDistanceTo2", function(assert) {
	var vectorA = new capsule.Vector(0, 3);
	var vectorB = new capsule.Vector(4, 0);

	assert.equal(vectorA.getDistanceTo(vectorB), 5);
	assert.equal(vectorA.getDistanceTo2(vectorB), 25);
});

QUnit.test("setPolar", function(assert) {
	var i;
	var TAU     = capsule.math.TAU;
	var modulus = capsule.math.modulus;
	var round   = Math.round;
	var vector  = new capsule.Vector();

	for (i = 0; i < 10; i += 1) {
		vector.setPolar(i, 1);
		assert.equal(modulus(vector.angle, TAU).toFixed(10), (i % TAU).toFixed(10), "Checking angle.");
		assert.equal(round(vector.length), 1, "Checking length.");

		vector.setPolar(i, i + 1);
		assert.equal(modulus(vector.angle, TAU).toFixed(10), (i % TAU).toFixed(10), "Checking angle.");
		assert.equal(round(vector.length), i + 1, "Checking length.");
	}
});

QUnit.test("add", function(assert) {
	var vector = new capsule.Vector();

	vector.add(new capsule.Vector(5, 5));
	assert.equal(vector.x, 5);
	assert.equal(vector.y, 5);
});

QUnit.test("subtract", function(assert) {
	var vector = new capsule.Vector(10, 10);

	vector.subtract(new capsule.Vector(5, 5));
	assert.equal(vector.x, 5);
	assert.equal(vector.y, 5);
});

QUnit.test("multiply", function(assert) {
	var vector = new capsule.Vector(1, 1);

	vector.multiply(new capsule.Vector(5, 5));
	assert.equal(vector.x, 5);
	assert.equal(vector.y, 5);
});

QUnit.test("divide", function(assert) {
	var vector = new capsule.Vector(10, 10);

	vector.divide(new capsule.Vector(2, 2));
	assert.equal(vector.x, 5);
	assert.equal(vector.y, 5);
});

QUnit.test("scale", function(assert) {
	var vector = new capsule.Vector(1, 1);

	vector.scale(5);
	assert.equal(vector.x, 5);
	assert.equal(vector.y, 5);
});

QUnit.test("getAngleBetween", function(assert) {
	var vectorA = new capsule.Vector(0, 1);
	var vectorB = new capsule.Vector(1, 0);

	var angle = vectorA.getAngleBetween(vectorB);
	assert.equal(angle, Math.PI / 2);
});

QUnit.test("normalize", function(assert) {
	var vector = new capsule.Vector(3, 4);

	vector.normalize();
	assert.equal(vector.x, 0.6);
	assert.equal(vector.y, 0.8);
});

QUnit.test("reverse", function(assert) {
	var vector = new capsule.Vector(5, 5);

	vector.reverse();
	assert.equal(vector.x, -5);
	assert.equal(vector.y, -5);
});
