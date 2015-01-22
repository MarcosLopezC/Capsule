/*
	Defines the Size object and its methods.
*/

"use strict";

var abs = Math.abs;
var descriptor = require("./descriptor.js");

// Represents the size of a 2d object.
var Size = module.exports = function(width, height) {
	this.width  = width  || 0;
	this.height = height || 0;
};

var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(Size.prototype, key, accessor);
};

// Gets the absolute value of the width.
defineAccessor("absoluteWidth", {
	get: function() {
		return abs(this.width);
	}
});

// Gets the absolute value of the height.
defineAccessor("absoluteHeight", {
	get: function() {
		return abs(this.height);
	}
});

// Gets a value indicating whether the area of the size is 0.
defineAccessor("isEmpty", {
	get: function() {
		return this.width === 0 || this.height === 0;
	}
});

// Returns a deep copy.
Size.prototype.clone = function() {
	return new Size(this.width, this.height);
};

// Removes the decimal component from the dimensions.
Size.prototype.truncate = function() {
	this.width  = this.width  | 0;
	this.height = this.height | 0;
};
