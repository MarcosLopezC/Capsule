/*
	Defines the Text class and its methods.
*/

"use strict";

var descriptor = require("./descriptor.js");
var Vector = require("./Vector.js");
var Style = require("./Style.js");
var Font = require("./Font.js");

// Initializes a new instance of the Text class.
var Text = module.exports = function() {
	this.value    = "";
	this.position = new Vector();
	this.style    = new Style();
	this.font     = new Font();
};

// Defines the accessors for the Text class.
var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(Text.prototype, key, accessor);
};

// Gets or sets the horizontal position of this text.
defineAccessor("x", {
	get: function() {
		return this.position.x;
	},
	set: function(value) {
		this.position.x = value;
	}
});

// Gets or sets the vertical position of this text.
defineAccessor("y", {
	get: function() {
		return this.position.y;
	},
	set: function(value) {
		this.position.y = value;
	}
});

// Draws this text to the given 2D canvas context.
Text.prototype.draw = function(context) {
	context.save();
	this.style.apply(context);
	this.font.apply(context);
	if (this.style.fillColor.alpha > 0) {
		context.fillText(this.value, this.x, this.y);
	}
	if (this.style.strokeThickness > 0) {
		context.strokeText(this.value, this.x, this.y);
	}
	context.restore();
	return this;
};

// Returns a deep copy of this text.
Text.prototype.clone = function() {
	var text = new Text();
	text.value    = this.value;
	text.position = this.position.clone();
	text.style    = this.style.clone();
	text.font     = this.font.clone();
	return text;
};
