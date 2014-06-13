// Requires: capsule.js
// Requires: utilities.js

/**
 * A collection of useful math functions and values for games.
 *
 * @namespace
 * @type Object
 */
capsule.math = (function() {
	"use strict";

	/**
	 * @type Object
	 */
	var math = Object.create(Math);

	math.TAU     = Math.PI * 2;
	math.HALF_PI = Math.PI / 2;

	math.ANGLE_RIGHT = math.TAU * 0.00;
	math.ANGLE_DOWN  = math.TAU * 0.25;
	math.ANGLE_LEFT  = math.TAU * 0.50;
	math.ANGLE_UP    = math.TAU * 0.75;

	/**
	 * Divides the dividend by the divisor and returns the modulus.
	 * Unlike the mod operator (%) which returns the remainder, this
	 * function returns mathematical modulus, which is always a
	 * positive value.
	 *
	 * @param {Number} dividend
	 * @param {Number} divisor
	 * @returns {Number}
	 */
	math.getModulus = function(dividend, divisor) {
		if (dividend > 0) {
			return dividend % divisor;
		}
		else {
			return ((dividend % divisor) + divisor) % divisor;
		}
	};

	/**
	 * Gets a random angle, in radians.
	 *
	 * @returns {Number}
	 */
	math.getRandomAngle = function() {
		return Math.random() * math.TAU;
	};

	/**
	 * Gets a random number in the range [min, max).
	 *
	 * @param {Number} min The lower bound of the range. Defaults to 0.
	 * @param {Number} max The upper bound of the range. Defaults to 1.
	 * @returns {Number}
	 */
	math.getRandomNumber = function(min, max) {
		max = max || 1;
		min = min || 0;
		return (Math.random() * (max - min)) + min;
	};

	/**
	 * Gets a random integer in the range [min, max].
	 *
	 * @param {Number} min The lower bound of the range.
	 * @param {Number} max The upper bound of the range.
	 * @returns {Number}
	 */
	math.getRandomInteger = function(min, max) {
		return Math.floor(math.getRandomNumber(min, max + 1));
	};

	/**
	 * Constrains the given value to the range [min, max].
	 *
	 * @param {Number} value The number to be constrained.
	 * @param {Number} min The lower bound of the range.
	 * @param {Number} max The upper bound of the range.
	 * @returns {Number}
	 */
	math.constrain = function(value, min, max) {
		return Math.min(Math.max(value, min), max);
	};

	/**
	 * Determines whether given value is in the range [min, max].
	 *
	 * @param {Number} value The number to be tested.
	 * @param {Number} min The lower bound of the range.
	 * @param {Number} max The upper bound of the range.
	 * @returns {Boolean}
	 */
	math.isBetween = function(value, min, max) {
		return value > min && value < max;
	};

	/**
	 * Normalizes the given value in the range [min, max]
	 * over the range [0, 1].
	 *
	 * @param {Number} value The number to be normalized.
	 * @param {Number} min The lower bound of the range.
	 * @param {Number} max The upper bound of the range.
	 * @returns {Number}
	 */
	math.normalize = function(value, min, max) {
		return (value - min) / (max - min);
	};

	/**
	 * Computes the linear interpolation of a normal value
	 * over the range [min, max].
	 *
	 * @param {Number} value A normal value [0, 1].
	 * @param {Number} min The lower bound of the range.
	 * @param {Number} max The upper bound of the range.
	 * @returns {Number}
	 */
	math.getLinearInterpolation = function(value, min, max) {
		return (1 - value) * min + value * max;
	};

	/**
	 * Maps the given value from the source range to
	 * the destination range.
	 *
	 * @param {Number} value The value to be mapped.
	 * @param {Number} fromMin The lower bound of the source range.
	 * @param {Number} fromMax The upper bound of the source range.
	 * @param {Number} toMin The lower bound of the destination range.
	 * @param {Number} toMax The upper bound of the destination range.
	 * @returns {Number}
	 */
	math.map = function(value, fromMin, fromMax, toMin, toMax) {
		var normal = math.normalize(value, fromMin, fromMax);
		return math.getLinearInterpolation(normal, toMin, toMax);
	};

	/**
	 * Converts the given number, represeting an angle in radians,
	 * into a number representing the angle in degrees.
	 *
	 * @param {Number} radians
	 * @returns {Number}
	 */
	math.toDegrees = function(radians) {
		return (radians * 180) / Math.PI;
	};

	/**
	 * Converts the given number, representing an angle in degrees,
	 * into a number representing the angle in radians.
	 *
	 * @param {Number} degrees
	 * @returns {Number}
	 */
	math.toRadians = function(degrees) {
		return (degrees * Math.PI) / 180;
	};

	capsule.utilities.applyDataDescriptor(math);

	return math;
}());
