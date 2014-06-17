QUnit.test("capsule.math", function(assert) {
	assert.ok(capsule.math, "capsule.math is defined.");
	assert.ok(typeof capsule.math === "object", "capsule.math is an object.")
});

QUnit.test("capsule.math.getModulus", function(assert) {
	var getModulus = capsule.math.getModulus;

	assert.equal(getModulus(10, 20),  10);
	assert.equal(getModulus(10,  5),   0);
	assert.equal(getModulus(5 ,  2),   1);
	assert.equal(getModulus(-5,  2),   1);
	assert.equal(getModulus(0 , 10),   0);

	assert.equal(isNaN(getModulus(5, 0)), true);
});

QUnit.test("capsule.math.getRandomAngle", function(assert) {
	var i;
	var value;
	var getRandomAngle = capsule.math.getRandomAngle;
	var TAU = capsule.math.TAU;

	for (i = 0; i < 100; i += 1) {
		value = getRandomAngle();
		assert.ok(value > 0 && value < TAU, value + " is in the expected range.");
	}
});

QUnit.test("capsule.math.getRandomNumber", function(assert) {
	var i;
	var value;
	var getRandomNumber = capsule.math.getRandomNumber;
	var isBetween       = capsule.math.isBetween;

	for (i = 5; i < 100; i += 5) {
		value = getRandomNumber(0, i);
		assert.ok(isBetween(value, 0, i),
			value + " is in the expected range. Min: 0, Max: " + i);
		value = getRandomNumber(50 - i, i);
		assert.ok(isBetween(value, 50 - i, i),
			value + "is in the expected range. Min: " + (50 - i) + ", Max: " + i);
		value = getRandomNumber(-i, 0);
		assert.ok(isBetween(value, -i, 0),
			value + " is in the expected range. Min: " + -i + ", Max: 0");
	}
});

QUnit.test("capsule.math.getRandomInteger", function(assert) {
	var i;
	var value;
	var getRandomInteger = capsule.math.getRandomInteger;
	var isBetween        = capsule.math.isBetween;

	for (i = 0; i < 100; i += 5) {
		value = getRandomInteger(0, i);
		assert.equal(value, Math.floor(value), value + " is an integer.");
		assert.ok(isBetween(value, 0, i), value + " is in the expected range. Min: 0, Max: " + i);
		value = getRandomInteger(-i, 0);
		assert.ok(isBetween(value, -i, 0), value + " is in the expected range. Min: " + (-i) + " Max: 0");
	}
});

QUnit.test("capsule.math.constrain", function(assert) {
	var constrain = capsule.math.constrain;
	assert.equal(constrain( 50, 0, 100),  50);
	assert.equal(constrain(-50, 0, 100),   0);
	assert.equal(constrain(200, 0, 100), 100);
});

QUnit.test("capsule.math.isBetween", function(assert) {
	var isBetween = capsule.math.isBetween;
	assert.equal(isBetween( 50, 0, 100),  true);
	assert.equal(isBetween(-50, 0, 100), false);
	assert.equal(isBetween(200, 0, 100), false);
	assert.equal(isBetween(  0, 0, 100),  true);
	assert.equal(isBetween(100, 0, 100),  true);
});

QUnit.test("capsule.math.normalize", function(assert) {
	var normalize = capsule.math.normalize;
	assert.equal(normalize( 50, 0, 100),  0.50);
	assert.equal(normalize( 25, 0, 100),  0.25);
	assert.equal(normalize( 10, 0, 100),  0.10);
	assert.equal(normalize(-10, 0, 100), -0.10);
	assert.equal(normalize(-50, 0, 100), -0.50);
	assert.equal(normalize(200, 0, 100),  2.00);
});

QUnit.test("capsule.math.getLinearInterpolation", function(assert) {
	var lerp = capsule.math.getLinearInterpolation;
	assert.equal(lerp( 0.50,   0, 100),  50);
	assert.equal(lerp( 0.25,   0, 100),  25);
	assert.equal(lerp( 0.10,   0, 100),  10);
	assert.equal(lerp(-0.50,   0, 100), -50);
	assert.equal(lerp( 0.50, 100,   0),  50);
	assert.equal(lerp(-0.50, 100,   0), 150);
	assert.equal(lerp( 2.00,   0, 100), 200);
});

QUnit.test("capsule.math.map", function(assert) {
	var map = capsule.math.map;
	assert.equal(map(50,    0, 100,   0, 10), 5.0);
	assert.equal(map(50,    0, 100, -10, 10), 0.0);
	assert.equal(map(50, -100, 100,   0, 10), 7.5);
});

QUnit.test("capsule.math.toDegrees", function(assert) {
	var toDegrees = capsule.math.toDegrees;
	var TAU = capsule.math.TAU;
	assert.equal(toDegrees(Math.PI / 2), 90);
	assert.equal(toDegrees(0), 0);
	assert.equal(toDegrees(TAU), 360);
});

QUnit.test("capsule.math.toRadians", function(assert) {
	var toRadians = capsule.math.toRadians;
	var TAU = capsule.math.TAU;
	assert.equal(toRadians(90), Math.PI / 2);
	assert.equal(toRadians(0), 0);
	assert.equal(toRadians(360), TAU);
});
