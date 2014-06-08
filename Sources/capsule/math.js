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

	// Gets the modulus.
	math.getModulus = function(dividend, divisor) {
		if (dividend > 0) {
			return dividend % divisor;
		}
		else {
			return ((dividend % divisor) + divisor) % divisor;
		}
	};

	// Gets a random angle.
	math.getRandomAngle = function() {
		return Math.random() * math.TAU;
	};

	// Gets a random number between min and max.
	math.getRandomNumber = function(min, max) {
		max = max || 1;
		min = min || 0;
		return (Math.random() * (max - min)) + min;
	};

	math.getRandomInteger = function(min, max) {
		return Math.floor(math.getRandomNumber(min, max + 1));
	};

	// Returns a value between min and max.
	math.clamp = function(value, min, max) {
		return Math.min(Math.max(value, min), max);
	};

	math.isBetween = function(value, min, max) {
		return value > min && value < max;
	};

	math.normalize = function(value, min, max) {
		return (value - min) / (max - min);
	};

	math.getLinearInterpolation = function(value, min, max) {
		return (1 - value) * min + value * max;
	};

	math.map = function(value, fromMin, fromMax, toMin, toMax) {
		var normal = math.normalize(value, fromMin, fromMax);
		return math.getLinearInterpolation(normal, toMin, toMax);
	};

	math.toDegrees = function(radians) {
		return (radians * 180) / Math.PI;
	};

	math.toRadians = function(degrees) {
		return (degrees * Math.PI) / 180;
	};

	capsule.utilities.applyDataDescriptor(math);

	return math;
}());
