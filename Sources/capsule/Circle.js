// Requires: capsule.js
// Requires: math.js
// Requires: Vector.js
// Requires: Style.js

capsule.Circle = (function() {
	"use strict";

	// Aliases
	var TAU    = capsule.math.TAU;
	var Vector = capsule.Vector;
	var Style  = capsule.Style;
	var game   = capsule.game;

	var Circle = function(position, radius, style) {
		this.position = position || new Vector();
		this.style    = style    || new Style();

		this.radius   = typeof radius === "number" ? radius : 1;
	};

	Circle.prototype.clone = function() {
		return new Circle(this.position.clone(), this.radius, this.style.clone());
	};

	Circle.prototype.collidesWith = function(circle) {
		var distance2  = this.position.getDistanceTo2(circle.position);
		var radiusSum  = this.radius + circle.radius;
		var radiusSum2 = radiusSum * radiusSum;
		return distance2 < radiusSum2;
	};

	Circle.prototype.isInsideOf = function(circle) {
		// Formula: distance + circle.radius < this.radius
		var radiusDifference  = this.radius - circle.radius;
		var radiusDifference2 = radiusDifference * radiusDifference;
		var distance2         = this.position.getDistanceTo2(circle.position);
		return distance2 < radiusDifference2;
	};

	Circle.prototype.draw = function(context) {
		context = context || game.context;

		var position = this.position;
		var radius   = this.radius;
		var style    = this.style;

		context.save();

		style.apply(context);

		context.beginPath();
		context.arc(position.x, position.y, radius, 0, TAU);
		context.fill();

		if (style.strokeThickness > 0) {
			context.stroke();
		}

		context.restore();

		return this;
	};

	return Circle;
}());
