/*
	Defines the Rectangle object and its methods.
*/

"use strict";

var descriptor = require("./descriptor.js");
var Vector = require("./Vector.js");
var Style = require("./Style.js");
var Size = require("./Size.js");

// Initializes a new instance of the Rectangle class.
var Rectangle = module.exports = function() {
	this.position = new Vector();
	this.style    = new Style();
	this.size     = new Size();
};

// Defines the accessors for the Rectangle class.
var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(Rectangle.prototype, key, accessor);
};

// Gets or sets the horizontal position of this rectangle.
defineAccessor("x", {
	get: function() {
		return this.position.x;
	},
	set: function(value) {
		this.position.x = value;
	}
});

// Gets or sets the vertical position of this rectangle.
defineAccessor("y", {
	get: function() {
		return this.position.y;
	},
	set: function(value) {
		this.position.y = value;
	}
});

// Gets or sets the width of this rectangle.
defineAccessor("width", {
	get: function() {
		return this.size.width;
	},
	set: function(value) {
		this.size.width = value;
	}
});

// Gets or sets the height of this rectangle.
defineAccessor("height", {
	get: function() {
		return this.size.height;
	},
	set: function(value) {
		this.size.height = value;
	}
});

// Checks whether this rectangle collides with the given rectangle.
Rectangle.prototype.collidesWith = function(rectangle) {
	return (
		this.x < (rectangle.x + rectangle.width)  &&
		this.y < (rectangle.y + rectangle.height) &&
		rectangle.x < (this.x + this.width)       &&
		rectangle.y < (this.y + this.height)
	);
};

// Checks whether this rectangle is inside of the given rectangle.
Rectangle.prototype.isInsideOf = function(rectangle) {
	return (
		this.x > rectangle.x &&
		this.y > rectangle.y &&
		(this.x + this.width)  < (rectangle.x + rectangle.width) &&
		(this.y + this.height) < (rectangle.y + rectangle.height)
	);
};

// Draws this rectangle in the given 2D canvas context.
Rectangle.prototype.draw = function(context) {
	context.save();
	this.style.apply(context);
	context.fillRect(this.x, this.y, this.width, this.height);
	if (this.style.strokeThickness > 0) {
		context.strokeRect(this.x, this.y, this.width, this.height);
	}
	context.restore();
	return this;
};

// Returns a deep copy of this rectangle.
Rectangle.prototype.clone = function() {
	var rectangle = new Rectangle();
	rectangle.position = this.position.clone();
	rectangle.style    = this.style.clone();
	rectangle.size     = this.size.clone();
	return rectangle;
};
