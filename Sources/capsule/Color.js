// Requires: capsule.js
// Requires: utilities.js
// Requires: math.js

capsule.Color = (function() {
	"use strict";

	// Aliases
	var round     = Math.round;
	var constrain = capsule.math.constrain;

	var Color = function(red, green, blue, alpha) {
		this._red   = 0;
		this._green = 0;
		this._blue  = 0;
		this._alpha = 0;

		this.red   = typeof red   === "number" ? red   : 0;
		this.green = typeof green === "number" ? green : 0;
		this.blue  = typeof blue  === "number" ? blue  : 0;
		this.alpha = typeof alpha === "number" ? alpha : 1;

		this._cache = null;

		capsule.utilities.applyDataDescriptor(this);
	};

	var invalidate = function(color) {
		color._cache = null;
	};

	capsule.utilities.defineAccessorProperties(Color.prototype, {
		red: {
			get: function() {
				return this._red;
			},
			set: function(value) {
				this._red = constrain(round(value), 0, 255);
				invalidate(this);
			}
		},
		green: {
			get: function() {
				return this._green;
			},
			set: function(value) {
				this._green = constrain(round(value), 0, 255);
				invalidate(this);
			}
		},
		blue: {
			get: function() {
				return this._blue;
			},
			set: function(value) {
				this._blue = constrain(round(value), 0, 255);
				invalidate(this);
			}
		},
		alpha: {
			get: function() {
				return this._alpha;
			},
			set: function(value) {
				this._alpha = constrain(value.toFixed(2), 0, 1);
				invalidate(this);
			}
		}
	});

	Color.prototype.clone = function() {
		return new Color(this.red, this.green, this.blue, this.alpha);
	};

	Color.prototype.toString = function() {
		if (this._cache === null) {
			var red   = this._red.toString(10);
			var green = this._green.toString(10);
			var blue  = this._blue.toString(10);
			var alpha = this._alpha.toString(10);
			this._cache = String.concat("rgba(", red, ", ", green, ", ", blue, ", ", alpha, ")");
		}

		return this._cache;
	};

	return Color;
}());
