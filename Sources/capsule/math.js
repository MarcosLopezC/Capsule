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

	// Returns a value between min and max.
	math.getRange = function(value, min, max) {
		if (value < min) {
			return min;
		}
		else if (value > max) {
			return max;
		}
		else {
			return value;
		}
	};

	capsule.utilities.applyDataDescriptor(math);

	return math;
}());
