// Requires: capsule.js
// Requires: utilities.js

capsule.math = (function() {
	"use strict";

	var math = Object.create(Math);

	math.TAU     = Math.PI * 2;
	math.HALF_PI = Math.PI / 2;

	math.ANGLE_RIGHT = math.TAU * 0.00;
	math.ANGLE_DOWN  = math.TAU * 0.25;
	math.ANGLE_LEFT  = math.TAU * 0.50;
	math.ANGLE_UP    = math.TAU * 0.75;

	// Divides the dividend by the divisor and returns the modulus.
	math.modulus = function(dividend, divisor) {
		if (dividend > 0) {
			return dividend % divisor;
		}
		else {
			return ((dividend % divisor) + divisor) % divisor;
		}
	};

	// Returns a random angle, an radians.
	math.randomAngle = function() {
		return Math.random() * math.TAU;
	};

	// Returns a random number in the range [min, max).
	math.randomNumber = function(min, max) {
		return math.linearInterpolation(Math.random(), min, max);
	};

	// Returns a random integer in the range [min, max].
	math.randomInteger = function(min, max) {
		return Math.floor(math.randomNumber(min, max + 1));
	};

	// Returns the given value constrain in the range [min, max].
	math.constrain = function(value, min, max) {
		return Math.min(Math.max(value, min), max);
	};

	// Returns a value indicating whether the given value is in the range [min, max].
	math.isBetween = function(value, min, max) {
		return value >= Math.min(min, max) && value <= Math.max(min, max);
	};

	// Returns given value in the range [min, max) normalized over the range [0, 1).
	math.normalize = function(value, min, max) {
		return (value - min) / (max - min);
	};

	// Returns the linear interpolation of the given normal value over the range [min, max).
	math.linearInterpolation = function(value, min, max) {
		return (1 - value) * min + value * max;
	};

	// Returns the given value in the range [fromMin, fromMax) mapped to the range [toMin, toMax).
	math.map = function(value, fromMin, fromMax, toMin, toMax) {
		var normal = math.normalize(value, fromMin, fromMax);
		return math.linearInterpolation(normal, toMin, toMax);
	};

	// Returns the given radian angle represented in degrees.
	math.toDegrees = function(radians) {
		return (radians * 180) / Math.PI;
	};

	// Returns the given degree angle represented in radians.
	math.toRadians = function(degrees) {
		return (degrees * Math.PI) / 180;
	};

	capsule.utilities.applyDataDescriptor(math);

	return math;
}());
