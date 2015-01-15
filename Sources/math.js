/*
	Useful Math functions and constants.
*/

"use strict";

var descriptor = require("./descriptor.js");

var defineConstant = function(key, value) {
	descriptor.defineConstant(exports, key, value);
};

defineConstant("TAU", Math.PI * 2);

defineConstant("HALF_PI", Math.PI / 2);

// Returns the remainder of the Euclidean division between the dividend and the divisor.
exports.modulus = function(dividend, divisor) {
	return ((dividend % divisor) + divisor) % divisor;
};

// Returns a value indicating whether the given value is between a and b.
exports.isBetween = function(value, a, b) {
	if (a > b) {
		return value >= b && value <= a;
	}
	else {
		return value >= a && value <= b;
	}
};

// Returns the given value constrained to the range [min, max].
exports.constrain = function(value, min, max) {
	return Math.min(Math.max(value, min), max);
};

// Returns a value in the range [0, 1) based on the given value over the the range [min, max).
exports.normalize = function(value, min, max) {
	return (value - min) / (max - min);
};

// Returns the linear interpolation of the given normalized value over the range [min, max).
exports.linearInterpolation = function(value, min, max) {
	return (1 - value) * min + value * max;
};

// Returns a value in the range [toMin, toMax) resulting from mapping the given value
// in the range [fromMin, fromMax).
exports.map = function(value, fromMin, fromMax, toMin, toMax) {
	var normal = exports.normalize(value, fromMin, fromMax);
	return exports.linearInterpolation(normal, toMin, toMax);
};

// Returns the value of a random angle, in radians.
exports.randomAngle = function() {
	return Math.random() * 360;
};

// Returns the value of a random number in the range [min, max).
exports.randomNumber = function(min, max) {
	return exports.linearInterpolation(Math.random(), min, max);
};

// Returns the value of a random integer in the range [min, max].
exports.randomInteger = function(min, max) {
	return exports.randomNumber(min, max + 1) | 0;
};

// Returns the given radian angle represented in degrees.
exports.toDegrees = function(radians) {
	return (radians * 180) / Math.PI;
};

// Returns the given degree angle represented in radians.
exports.toRadians = function(degrees) {
	return (degrees * Math.PI) / 180;
};

// Returns the sine of an angle in degrees.
exports.sin = function(x) {
	return Math.sin(exports.toRadians(x));
};

// Returns the cosine of an angle in degrees.
exports.cos = function(x) {
	return Math.cos(exports.toRadians(x));
};

// Returns the tangent of an angle in degrees.
exports.tan = function(x) {
	return Math.tan(exports.toRadians(x));
};

// Returns the arcSin of a value, in degrees.
exports.arcSin = function(x) {
	return exports.toDegrees(Math.asin(x));
};

// Returns the arcCos of a value, in degrees.
exports.arcCos = function(x) {
	return exports.toDegrees(Math.acos(x));
};

// Returns the arcTan of a value, in degrees.
exports.arcTan = function(y, x) {
	if (typeof x === "number") {
		return exports.toDegrees(Math.atan2(y, x));
	}
	else {
		return exports.toDegrees(Math.atan(y));
	}
};

// Returns the smallest of all the values passed.
exports.min = function() {
	var min = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		if (arguments[i] < min) {
			min = arguments[i];
		}
	}
	return min;
};

// Returns the largest of all the values passed.
exports.max = function() {
	var max = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		if (arguments[i] > max) {
			max = arguments[i];
		}
	}
	return max;
};
