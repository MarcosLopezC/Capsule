// Requires: capsule.js
// Requires: color.js

capsule.Style = (function() {
	"use strict";

	// Aliases
	var Color = capsule.Color;

	var Style = function() {
		this.fillColor       = new Color(255, 255, 255, 255);
		this.strokeColor     = new Color(0, 0, 0, 255);
		this.strokeThickness = 1;
	};

	Style.prototype.clone = function() {
		var style = new Style();

		style.fillColor       = this.fillColor.clone();
		style.strokeColor     = this.strokeColor.clone();
		style.strokeThickness = this.strokeThickness;

		return style;
	};

	Style.prototype.apply = function(context) {
		var strokeThickness = this.strokeThickness;

		if (strokeThickness > 0) {
			context.lineWidth   = strokeThickness;
			context.strokeStyle = this.strokeColor.toString();
		}

		context.fillStyle   = this.fillColor.toString();

		return this;
	};

	return Style;
}());
