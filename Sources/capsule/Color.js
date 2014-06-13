// Requires: capsule.js
// Requires: utilities.js
// Requires: math.js

capsule.Color = (function() {
	"use strict";

	var Color = function(red, green, blue, alpha) {
		this._red   = red   || 0;
		this._green = green || 0;
		this._blue  = blue  || 0;
		this._alpha = alpha || 255;
		this._cache = null;
		capsule.utilities.applyDataDescriptor(this);
	};

	var invalidate = function(color) {
		color._cache = null;
	};

	Color.prototype.red   = null;
	Color.prototype.green = null;
	Color.prototype.blue  = null;
	Color.prototype.alpha = null;

	capsule.utilities.defineAccessorProperties(Color.prototype, {
		red: {
			get: function() {
				return this._red;
			},
			set: function(value) {
				this._red = value;
				invalidate(this);
			}
		},
		green: {
			get: function() {
				return this._green;
			},
			set: function(value) {
				this._green = value;
				invalidate(this);
			}
		},
		blue: {
			get: function() {
				return this._blue;
			},
			set: function(value) {
				this._blue = value;
				invalidate(this);
			}
		},
		alpha: {
			get: function() {
				return this._alpha;
			},
			set: function(value) {
				this._alpha = value;
				invalidate(this);
			}
		}
	});

	Color.prototype.clone = function() {
		return new Color(this.red, this.green, this.blue, this.alpha);
	};

	var formatColor = function(value) {
		return capsule.math.constrain(Math.round(value), 0, 255).toString();
	};

	Color.prototype.toString = function() {
		if (this._cache === null) {
			var red   = formatColor(this.red);
			var green = formatColor(this.green);
			var blue  = formatColor(this.blue);
			var alpha = formatColor(this.alpha);
			this._cache = String.concat("rgba(", red, ", ", green, ", ", blue, ", ", alpha, ")");
		}

		return this._cache;
	};

	return Color;
}());
