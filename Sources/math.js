/*
	Useful Math functions and constants.
*/

"use strict";

var descriptor = require("./descriptor.js");

descriptor.defineConstant(exports, "TAU", Math.PI * 2);

descriptor.defineConstant(exports, "HALF_PI", Math.PI / 2);

// Returns the remainder of the Euclidean division between the dividend and the divisor.
exports.modulus = function(dividend, divisor) {
	return ((dividend % divisor) + divisor) % divisor;
};

// Returns a value indicating whether the given value is between a and b.
exports.isBetween = function(value, a, b) {
	var min, max;
	if (a > b) {
		max = a;
		min = b;
	}
	else {
		min = a;
		max = b;
	}
	return value >= min && value <= max;
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
