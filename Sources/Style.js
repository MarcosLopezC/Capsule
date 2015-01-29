/*
	Defines the Style object and its methods.
*/

"use strict";

var Color = require("./Color.js");

// Initializes a new instance of the Style class.
var Style = module.exports = function() {
	this.fillColor   = new Color();
	this.strokeColor = new Color();
	this.strokeThickness = 1;
};

// Returns a deep copy of this style.
Style.prototype.clone = function() {
	var style = new Style();
	style.fillColor   = this.fillColor.clone();
	style.strokeColor = this.strokeColor.clone();
	style.strokeThickness = this.strokeThickness;
	return style;
};

// Applies this style to the given 2D canvas context.
Style.prototype.apply = function(context) {
	context.fillStyle   = this.fillColor.toString();
	context.strokeStyle = this.strokeColor.toString();
	context.lineWidth   = this.strokeThickness;
	return this;
};
