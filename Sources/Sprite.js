/*
	Defines the Sprite class and its methods.
*/

"use strict";

var descriptor = require("./descriptor.js");
var capsuleMath = require("./math.js");
var Vector = require("./Vector.js");
var toDeg = capsuleMath.toDegrees;

// Initializes a new instance of the Sprite class.
var Sprite = module.exports = function() {
	this.origin   = new Vector();
	this.position = new Vector();
	this.rotation = 0;
	this.scale    = 1;
	this.image    = null;
};

// Defines the accessors for the Sprite class.
var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(Sprite.prototype, key, accessor);
};

// Gets a value indicating whether the sprite is ready to be drawn.
defineAccessor("isReady", {
	get: function() {
		// Image width and height is 0 until the image is loaded.
		return this.image !== null &&
			this.image.width + this.image.height !== 0;
	}
});

// Gets the width of the sprite.
defineAccessor("width", {
	get: function() {
		return this.image.width * this.scale;
	}
});

// Gets the height of the sprite.
defineAccessor("height", {
	get: function() {
		return this.image.height * this.scale;
	}
});

// Draws this sprite to the given 2D canvas context.
Sprite.prototype.draw = function(context) {
	context.save();
	context.translate(this.position.x, this.position.y);
	if (this.rotation !== 0) {
		context.rotation(toDeg(this.rotation));
	}
	if (this.scale !== 1) {
		context.scale(this.scale, this.scale);
	}
	context.drawImage(this.image, -this.origin.x, -this.origin.y);
	context.restore();
	return this;
};
