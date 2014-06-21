// Requires: capsule.js
// Requires: utilities.js

capsule.Size = (function() {
	"use strict";

	// Aliases
	var max   = Math.max;
	var floor = Math.floor;

	var Size = function(width, height) {
		this._width  = width  || 0;
		this._height = height || 0;

		capsule.utilities.applyDataDescriptor(this);
	};

	capsule.utilities.defineAccessorProperties(Size.prototype, {
		width: {
			get: function() {
				return this._width;
			},
			set: function(value) {
				this._width = max(0, value);
			}
		},
		height: {
			get: function() {
				return this._height;
			},
			set: function(value) {
				this._height = max(0, value);
			}
		},
		isEmpty: {
			get: function() {
				return this.width === 0 && this.height === 0;
			}
		}
	});

	Size.prototype.clone = function() {
		return new Size(this.width, this.height);
	};

	Size.prototype.truncate = function() {
		this.width  = floor(this.width);
		this.height = floor(this.height);
		return this;
	};

	return Size;
}());
