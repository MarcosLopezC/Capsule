/*
	Defines the vector object and its methods.
*/

"use strict";

var sqrt = Math.sqrt;
var descriptor = require("./descriptor.js");
var capsuleMath = require("./math.js");
var cos = capsuleMath.cos;
var sin = capsuleMath.sin;
var arcTan = capsuleMath.arcTan;

// Initializes a new instance of a Vector object.
var Vector = module.exports = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;
};

// Creates a new vector instance from a object.
Vector.fromObject = function(object) {
	return new Vector(object.x, object.y);
};

var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(Vector.prototype, key, accessor);
};

// Gets the squared length of the vector.
defineAccessor("lengthSquared", {
	get: function() {
		return (this.x * this.x) + (this.y * this.y);
	}
});

// Gets the length of the vector.
defineAccessor("length", {
	get: function() {
		return sqrt(this.lengthSquared);
	},
	set: function(value) {
		this.polar(this.angle, value);
	}
});

// Gets the angle of the vector.
defineAccessor("angle", {
	get: function() {
		return arcTan(this.y, this.x);
	},
	set: function(value) {
		this.polar(value, this.length);
	}
});

// Sets the x and y components using polar coordinates.
Vector.prototype.polar = function(angle, length) {
	this.x = length * cos(angle);
	this.y = length * sin(angle);
	return this;
};

// Returns the squared distance from the head of this vector to the head of the given vector.
Vector.prototype.distanceToSquared = function(vector) {
	var x = this.x - vector.x;
	var y = this.y - vector.y;
	return (x * x) + (y * y);
};

// Returns the distance from the head of this vector to the head of the given vector.
Vector.prototype.distanceTo = function(vector) {
	return sqrt(this.distanceWith(vector));
};

// Turns this vector into the result of adding the given vector.
Vector.prototype.add = function(vector) {
	this.x += vector.x;
	this.y += vector.y;
	return this;
};

// Turns this vector into the result of subtracting the given vector.
Vector.prototype.subtract = function(vector) {
	this.x -= vector.x;
	this.y -= vector.y;
	return this;
};

// Turns this vector into the result of multiply the given vector.
Vector.prototype.multiply = function(vector) {
	this.x *= vector.x;
	this.y *= vector.y;
	return this;
};

// Turns this vector into the result of dividing the given vector.
Vector.prototype.divide = function(vector) {
	this.x /= vector.x;
	this.y /= vector.y;
	return this;
};

// Returns the length of the cross product with the given vector.
Vector.prototype.cross = function(vector) {
	return (this.x * vector.y) - (this.y * vector.x);
};

// Returns the dot product with the given vector.
Vector.prototype.dot = function(vector) {
	return (this.x * vector.x) + (this.y * vector.y);
};

// Scales this vector with the given factor.
Vector.prototype.scale = function(factor) {
	this.x *= factor;
	this.y *= factor;
	return this;
};

// Turns this vector into a unit vector with the same direction.
Vector.prototype.normalize = function() {
	var inversedLength = 1 / this.length;
	this.x *= inversedLength;
	this.y *= inversedLength;
	return this;
};

// Reverses the direction of this vector.
Vector.prototype.reverse = function() {
	this.x *= -1;
	this.y *= -1;
};

// Returns a deep copy of this vector.
Vector.prototype.clone = function() {
	return new Vector(this.x, this.y);
};
