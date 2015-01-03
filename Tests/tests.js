QUnit.module("capsule");

QUnit.test("capsule", function(assert) {
	assert.equal(typeof capsule, "object", "capsule object is defined.");
});

QUnit.module("capsule.math");

QUnit.test("Checking if it's defined", function(assert) {
	assert.equal(typeof capsule.math, "object", "capsule.math object is defined.");
});

QUnit.test("modulus", function(assert) {
	var modulus = capsule.math.modulus;

	assert.equal(modulus(10, 20),  10);
	assert.equal(modulus(10,  5),   0);
	assert.equal(modulus(5 ,  2),   1);
	assert.equal(modulus(-5,  2),   1);
	assert.equal(modulus(0 , 10),   0);

	assert.equal(isNaN(modulus(5, 0)), true);
});

QUnit.test("randomAngle", function(assert) {
	var i;
	var value;
	var randomAngle = capsule.math.randomAngle;

	for (i = 0; i < 100; i += 1) {
		value = randomAngle();
		assert.ok(value > 0 && value < 360, value + " is in the expected range.");
	}
});

QUnit.test("randomNumber", function(assert) {
	var i;
	var value;
	var randomNumber = capsule.math.randomNumber;
	var isBetween    = capsule.math.isBetween;

	for (i = 0; i < 100; i += 1) {
		value = randomNumber(0, i);
		assert.ok(isBetween(value, 0, i),
			value + " is in the expected range. Min: 0, Max: " + i);
		value = randomNumber(50 - i, i);
		assert.ok(isBetween(value, 50 - i, i),
			value + "is in the expected range. Min: " + (50 - i) + ", Max: " + i);
		value = randomNumber(-i, 0);
		assert.ok(isBetween(value, -i, 0),
			value + " is in the expected range. Min: " + -i + ", Max: 0");
	}
});

QUnit.test("randomInteger", function(assert) {
	var i;
	var value;
	var randomInteger = capsule.math.randomInteger;
	var isBetween     = capsule.math.isBetween;

	for (i = 0; i < 100; i += 1) {
		value = randomInteger(0, i);
		assert.equal(value, Math.floor(value), value + " is an integer.");
		assert.ok(isBetween(value, 0, i), value + " is in the expected range. Min: 0, Max: " + i);
		value = randomInteger(-i, 0);
		assert.ok(isBetween(value, -i, 0), value + " is in the expected range. Min: " + (-i) + " Max: 0");
	}
});

QUnit.test("constrain", function(assert) {
	var constrain = capsule.math.constrain;
	assert.equal(constrain( 50, 0, 100),  50);
	assert.equal(constrain(-50, 0, 100),   0);
	assert.equal(constrain(200, 0, 100), 100);
});

QUnit.test("isBetween", function(assert) {
	var isBetween = capsule.math.isBetween;
	assert.equal(isBetween( 50, 0, 100),  true);
	assert.equal(isBetween(-50, 0, 100), false);
	assert.equal(isBetween(200, 0, 100), false);
	assert.equal(isBetween(  0, 0, 100),  true);
	assert.equal(isBetween(100, 0, 100),  true);
});

QUnit.test("normalize", function(assert) {
	var normalize = capsule.math.normalize;
	assert.equal(normalize( 50, 0, 100),  0.50);
	assert.equal(normalize( 25, 0, 100),  0.25);
	assert.equal(normalize( 10, 0, 100),  0.10);
	assert.equal(normalize(-10, 0, 100), -0.10);
	assert.equal(normalize(-50, 0, 100), -0.50);
	assert.equal(normalize(200, 0, 100),  2.00);
});

QUnit.test("linearInterpolation", function(assert) {
	var lerp = capsule.math.linearInterpolation;
	assert.equal(lerp( 0.50,   0, 100),  50);
	assert.equal(lerp( 0.25,   0, 100),  25);
	assert.equal(lerp( 0.10,   0, 100),  10);
	assert.equal(lerp(-0.50,   0, 100), -50);
	assert.equal(lerp( 0.50, 100,   0),  50);
	assert.equal(lerp(-0.50, 100,   0), 150);
	assert.equal(lerp( 2.00,   0, 100), 200);
});

QUnit.test("map", function(assert) {
	var map = capsule.math.map;
	assert.equal(map(50,    0, 100,   0, 10), 5.0);
	assert.equal(map(50,    0, 100, -10, 10), 0.0);
	assert.equal(map(50, -100, 100,   0, 10), 7.5);
});

QUnit.test("toDegrees", function(assert) {
	var toDegrees = capsule.math.toDegrees;
	var TAU = capsule.math.TAU;
	assert.equal(toDegrees(Math.PI / 2), 90);
	assert.equal(toDegrees(0), 0);
	assert.equal(toDegrees(TAU), 360);
});

QUnit.test("toRadians", function(assert) {
	var toRadians = capsule.math.toRadians;
	var TAU = capsule.math.TAU;
	assert.equal(toRadians(90), Math.PI / 2);
	assert.equal(toRadians(0), 0);
	assert.equal(toRadians(360), TAU);
});

QUnit.test("Checking constant properties", function(assert) {
	[
		"TAU",
		"HALF_PI"
	].forEach(function(name) {
		var descriptor = Object.getOwnPropertyDescriptor(capsule.math, name);
		assert.equal(descriptor.writable, false, name + " property is read-only.");
	});
});
