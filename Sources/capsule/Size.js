// Requires: capsule.js
// Requires: utilities.js

capsule.Size = (function() {
	"use strict";

	var Size = function(width, height) {
		this._width  = width  || 0;
		this._height = height || 0;

		capsule.utilities.applyDataDescriptor(this);
	};

	Size.prototype.width  = null;
	Size.prototype.height = null;

	capsule.utilities.defineAccessorProperties(Size.prototype, {
		width: {
			get: function() {
				return this._width;
			},
			set: function(value) {
				this._width = Math.max(0, value);
			}
		},
		height: {
			get: function() {
				return this._height;
			},
			set: function(value) {
				this._height = Math.max(0, value);
			}
		}
	});

	Size.prototype.clone = function() {
		return new Size(this.width, this.height);
	};

	Size.prototype.isEmpty = function() {
		if (this.width === 0 && this.height === 0) {
			return true;
		}
		else {
			return false;
		}
	};

	Size.prototype.truncate = function() {
		this.width  = Math.floor(this.width);
		this.height = Math.floor(this.height);
	};

	return Size;
}());
