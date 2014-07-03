// Requires: capsule.js
// Requires: utilities.js
// Requires: Vector.js
// Requires: Size.js
// Requires: Style.js

capsule.Rectangle = (function() {
	"use strict";

	// Aliases
	var Vector              = capsule.Vector;
	var Size                = capsule.Size;
	var Style               = capsule.Style;
	var game                = capsule.game;
	var applyDataDescriptor = capsule.utilities.applyDataDescriptor;

	var Rectangle = function(position, size, style) {
		this.position = position || new Vector();
		this.size     = size     || new Size();
		this.style    = style    || new Style();

		this._min = new Vector();
		this._max = new Vector();

		applyDataDescriptor(this);
	};

	var getMin = function(rectangle) {
		var min      = rectangle._min;
		var position = rectangle.position;

		min.x = position.x;
		min.y = position.y;

		return min;
	};

	var getMax = function(rectangle) {
		var max      = rectangle._max;
		var position = rectangle.position;
		var size     = rectangle.size;

		max.x = position.x + size.width;
		max.y = position.y + size.height;

		return max;
	};

	Rectangle.prototype.clone = function() {
		return new Rectangle(this.size.clone(), this.position.clone(), this.style.clone());
	};

	Rectangle.prototype.collidesWith = function(rectangle) {
		var minA = getMin(this);
		var maxA = getMax(this);
		var minB = getMin(rectangle);
		var maxB = getMax(rectangle);

		return (maxA.x > minB.x && maxA.y > minB.y) &&
			(maxB.x > minA.x && maxB.y > minA.y);
	};

	Rectangle.prototype.isInsideOf = function(rectangle) {
		var minA = getMin(this);
		var maxA = getMax(this);
		var minB = getMin(rectangle);
		var maxB = getMax(rectangle);

		return (minA.x > minB.x && minA.y > minB.y) &&
			(maxA.x < maxB.x && maxA.y < maxB.y);
	};

	Rectangle.prototype.draw = function(context) {
		context = context || game.context;

		var position = this.position;
		var size     = this.size;
		var style    = this.style;

		context.save();

		style.apply(context);

		context.fillRect(position.x, position.y, size.width, size.height);

		if (style.strokeThickness > 0) {
			context.strokeRect(
				position.x  | 0,
				position.y  | 0,
				size.width  | 0,
				size.height | 0
			);
		}

		context.restore();

		return this;
	};

	return Rectangle;
}());
