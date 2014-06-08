// Requires: capsule.js
// Requires: math.js
// Requires: Vector.js
// Requires: Style.js

capsule.Circle = (function() {
	"use strict";

	var Circle = function(position, radius, style) {
		this.position = position || new capsule.Vector();
		this.radius   = radius   || 1;
		this.style    = style    || new capsule.Style();
	};

	Circle.prototype.clone = function() {
		return new Circle(this.position.clone(), this.radius, this.style.clone());
	};

	Circle.prototype.collidesWith = function(circle) {
		var distance2 = capsule.Vector.getDistanceBetween2(this.position, circle.position);
		var radiusSum = this.radius + circle.radius;
		var radiusSum2 = radiusSum * radiusSum;
		return distance2 < radiusSum2;
	};

	Circle.prototype.isInsideOf = function(circle) {
		// Formula: distance + circle.radius < this.radius
		var radiusDifference = this.radius - circle.radius;
		var radiusDifference2 = radiusDifference * radiusDifference;
		var distance2 = capsule.Vector.getDistanceBetween2(this.position, circle.position);
		return distance2 < radiusDifference2;
	};

	Circle.prototype.draw = function(context) {
		context = context || capsule.game.context;

		var position = this.position;
		var radius   = this.radius;
		var style    = this.style;

		context.save();

		context.fillStyle = style.fillColor.toString();
		context.beginPath();
		context.arc(position.x, position.y, radius, 0, capsule.math.TAU);
		context.fill();

		if (style.strokeThickness > 0) {
			context.lineWidth   = style.strokeThickness;
			context.strokeStyle = style.strokeColor.toString();
			context.stroke();
		}

		context.restore();

		return this;
	};

	return Circle;
}());
