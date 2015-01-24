/*
	Defines the Color object and its methods.
*/

"use strict";

var capsuleMath = require("./math.js");
var constrain = capsuleMath.constrain;
var normalize = capsuleMath.normalize;
var getMax = capsuleMath.max;
var getMin = capsuleMath.min;
var mod = capsuleMath.modulus;
var map = capsuleMath.map;
var descriptor = require("./descriptor.js");

// Represents a color.
var Color = module.exports = function() {
	this._alpha = 1;

	this._red   = 0;
	this._green = 0;
	this._blue  = 0;

	this._cssString = null;
};

// Creates a new color from the given RGB components. Alpha is optional and defaults to 1.
Color.fromRgb = function(red, green, blue, alpha) {
	var color = new Color();
	color.setRgb(red, green, blue);
	color.alpha = alpha || 1;
	return color;
};

// Creates a new color from the given HSB components. Alpha is optional and defaults to 1.
Color.fromHsb = function(hue, saturation, brightness, alpha) {
	var color = new Color();
	color.setHsb(hue, saturation, brightness);
	color.alpha = alpha || 1;
	return color;
};

var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(Color.prototype, key, accessor);
};

// Converts any number into a valid byte value.
var toByte = function(value) {
	value = typeof value === "number" ? (value | 0) : 0;
	return constrain(value, 0, 255);
};

// Maps a byte value into a value between 0 and 1.
var normalizeByte = function(value) {
	return normalize(value, 0, 255);
};

// Gets or sets the red component of the color.
defineAccessor("red", {
	get: function() {
		return this._red;
	},
	set: function(value) {
		this._red = toByte(value);
		this._cssString = null;
	}
});

// Gets or sets the green component of the color.
defineAccessor("green", {
	get: function() {
		return this._green;
	},
	set: function(value) {
		this._green = toByte(value);
		this._cssString = null;
	}
});

// Gets or sets the blue component of the color.
defineAccessor("blue", {
	get: function() {
		return this._blue;
	},
	set: function(value) {
		this._blue = toByte(value);
		this._cssString = null;
	}
});

// Gets or sets the alpha component of the color.
defineAccessor("alpha", {
	get: function() {
		return this._alpha;
	},
	set: function(value) {
		value = typeof value === "number" ? value : 0;
		this._alpha = constrain(value, 0, 1);
		this._cssString = null;
	}
});

// Gets the hue based in the HSB model.
Color.prototype.getHue = function() {
	var red   = normalizeByte(this.red);
	var green = normalizeByte(this.green);
	var blue  = normalizeByte(this.blue);

	var max = getMax(red, green, blue);
	var min = getMin(red, green, blue);

	var delta = max - min;

	var hue = null;

	// Computing hue in the set [0, 6].
	if (max === red) {
		hue = mod((green - blue) / delta, 6);
	}
	else if (max === green) {
		hue = ((blue - red) / delta) + 2;
	}
	else { // if (max === blue)
		hue = ((red - green) / delta) + 4;
	}

	// Returning hue in the set [0, 360].
	return hue * 60;
};

// Gets the saturation based in the HSB model.
Color.prototype.getSaturation = function() {
	var red   = normalizeByte(this.red);
	var green = normalizeByte(this.green);
	var blue  = normalizeByte(this.blue);

	var max = getMax(red, green, blue);
	var min = getMin(red, green, blue);

	var delta = max - min;

	return delta / max;
};

// Gets the brightness based in the HSB model.
Color.prototype.getBrightness = function() {
	var red   = normalizeByte(this.red);
	var green = normalizeByte(this.green);
	var blue  = normalizeByte(this.blue);

	return getMax(red, green, blue);
};

// Returns a deep copy of the color.
Color.prototype.clone = function() {
	var color = new Color();

	color._alpha = this._alpha;

	color._red   = this._red;
	color._green = this._green;
	color._blue  = this._blue;

	color._cssString = this._cssString;

	return color;
};

// Sets the RGB components of the color based on the given red, green and blue values.
Color.prototype.setRgb = function(red, green, blue) {
	this.red   = red;
	this.green = green;
	this.blue  = blue;
	return this;
};

// Sets the RGB components of the color based on the given hue, saturation and brightness values.
Color.prototype.setHsb = function(hue, saturation, brightness) {
	saturation = constrain(saturation, 0, 1);
	brightness = constrain(brightness, 0, 1);

	if (Number.isNaN(hue)) {
		this.setRgb(255, 255, 255);
	}
	else {
		// Mapping hue from [0, 360] to [0, 6] which simplifies calculations.
		hue = mod(map(hue, 0, 360, 0, 6), 6);

		var sector = hue | 0;

		var rising  = (hue - sector) * 255;
		var falling = 255 - rising;

		switch (sector) {
			case 0:
				this.setRgb(255, rising, 0);
				break;
			case 1:
				this.setRgb(falling, 255, 0);
				break;
			case 2:
				this.setRgb(0, 255, rising);
				break;
			case 3:
				this.setRgb(0, falling, 255);
				break;
			case 4:
				this.setRgb(rising, 0, 255);
				break;
			case 5:
				this.setRgb(255, 0, falling);
				break;
		}
	}

	var complement = 1 - saturation;

	// Apply saturation.
	this.red   += (complement * (255 - this.red));
	this.green += (complement * (255 - this.green));
	this.blue  += (complement * (255 - this.blue));

	// Apply brightness.
	this.red   = (brightness * this.red);
	this.green = (brightness * this.green);
	this.blue  = (brightness * this.blue);
};

// Returns a human readable string representation of the color.
// This string is also a valid CSS color name.
Color.prototype.toString = function() {
	if (this._cssString === null) {
		this._cssString = "rgba(" +
			this.red.toString(10) + "," +
			this.green.toString(10) + "," +
			this.blue.toString(10) + "," +
			this.alpha.toFixed(2) + ")";
	}
	return this._cssString;
};
