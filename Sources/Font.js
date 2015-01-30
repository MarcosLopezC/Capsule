/*
	Defines the Font class and its methods.
*/

"use strict";

var descriptor = require("./descriptor.js");
var max = Math.max;

var DEFAULT_FONT = "serif";

// Initializes a new instance of the Font class.
var Font = module.exports = function() {
	this._bold   = false;
	this._italic = false;
	this._size   = 10;
	this._family = DEFAULT_FONT;

	this._cssString = null;
};

// Defines the accessors for the Font class.
var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(Font.prototype, key, accessor);
};

// Gets or sets a value indicting whether the font is bold.
defineAccessor("bold", {
	get: function() {
		return this._bold;
	},
	set: function(value) {
		this._bold = !!value;
		this._cssString = null;
	}
});

// Gets or sets a value indicting whether the font is italic.
defineAccessor("italic", {
	get: function() {
		return this._italic;
	},
	set: function(value) {
		this._italic = !!value;
		this._cssString = null;
	}
});

// Gets or sets the size of the font, in pixels.
defineAccessor("size", {
	get: function() {
		return this._size;
	},
	set: function(value) {
		this._size = max(1, value);
		this._cssString = null;
	}
});

// Gets or sets the family name of the font.
defineAccessor("family", {
	get: function() {
		return this._family;
	},
	set: function(value) {
		this._family = (typeof value === "string") ? value : DEFAULT_FONT;
		this._cssString = null;
	}
});

// Applies the font to the given 2D canvas context.
Font.prototype.apply = function(context) {
	context.font = this.toString();
	return this;
};

// Returns a human readable string representation of this font.
// This string is also a valid CSS font property.
Font.prototype.toString = function() {
	// CSS font syntax: font-style font-variant font-weight font-size/line-height font-family
	if (this._cssString === null) {
		var properties = [];
		if (this._italic) {
			properties.push("italic");
		}
		if (this._bold) {
			properties.push("bold");
		}
		properties.push(this._size.toFixed(2) + "px");
		properties.push(this._family);
		this._cssString = properties.join(" ");
	}
	return this._cssString;
};

// Returns a deep copy of this font.
Font.prototype.clone = function() {
	var font = new Font();
	font._bold   = this._bold;
	font._italic = this._italic;
	font._size   = this._size;
	font._family = this._family;
	return font;
};
