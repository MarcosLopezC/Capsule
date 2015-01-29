/*
	Defines the Circle class and its methods.
*/

"use strict";

var descriptor = require("./descriptor.js");
var capsuleMath = require("./math.js");
var Vector = require("./Vector.js");
var Style = require("./Style.js");
var abs = Math.abs;

// Initializes a new instance of the Circle class.
var Circle = module.exports = function() {
	this.position = new Vector();
	this.style = new Style();
	this._radius = 1;
};

// Defines the accessors for the Circle class.
var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(Circle.prototype, key, accessor);
};

// Gets or sets the radius of the circle.
defineAccessor("radius", {
	get: function() {
		return this._radius;
	},
	set: function(value) {
		this._radius = abs(value);
	}
});

// Checks whether this circle collides with the given circle.
Circle.prototype.collidesWith = function(circle) {
	var distanceSquared = this.position.distanceToSquared(circle.position);
	var radiusSum = this.radius + circle.radius;
	var radiusSumSquared = radiusSum * radiusSum;
	return distanceSquared < radiusSumSquared;
};

// Checks whether this circle is inside of the given circle.
Circle.prototype.isInsideOf = function(circle) {
	var distanceSquared = this.position.distanceToSquared(circle.position);
	var radiusDifference = this.radius - circle.radius;
	var radiusDifferenceSquared = radiusDifference * radiusDifference;
	return distanceSquared < radiusDifferenceSquared;
};

// Draws this circle in the given 2D canvas context.
Circle.prototype.draw = function(context) {
	context.save();
	this.style.apply(context);
	context.beginPath();
	context.arc(this.position.x, this.position.y, this.radius, 0, capsuleMath.TAU);
	context.fill();
	if (this.style.strokeThickness > 0) {
		context.stroke();
	}
	context.restore();
	return this;
};

// Returns a deep copy of this circle.
Circle.prototype.clone = function() {
	var circle = new Circle();
	circle.position = this.position.clone();
	circle.style = this.style.clone();
	circle._radius = this._radius;
	return circle;
};
