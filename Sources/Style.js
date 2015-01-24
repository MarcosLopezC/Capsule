/*
	Defines the Style object and its methods.
*/

"use strict";

var Color = require("./Color.js");

var Style = module.exports = function() {
	this.fillColor   = new Color();
	this.strokeColor = new Color();
	this.strokeThickness = 1;
};

Style.prototype.clone = function() {
	var style = new Style();
	style.fillColor   = this.fillColor.clone();
	style.strokeColor = this.strokeColor.clone();
	style.strokeThickness = this.strokeThickness;
	return style;
};

Style.prototype.apply = function(context) {
	context.fillStyle   = this.fillColor.toString();
	context.strokeStyle = this.strokeColor.toString();
	context.lineWidth   = this.strokeThickness;
	return this;
};
