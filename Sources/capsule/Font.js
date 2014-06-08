// Requires: capsule.js
// Requires: utilities.js

capsule.Font = (function() {
	"use strict";

	var Font = function() {
		this._bold        = false;
		this._italic      = false;
		this._size        = 10;
		this._family      = "serif";
		this._cssProperty = null;

		capsule.utilities.applyDataDescriptor(this);
	};

	var invalidate = function(font) {
		font._cssProperty = null;
	};

	capsule.utilities.defineAccessorProperties(Font.prototype, {
		bold: {
			get: function() {
				return this._bold;
			},
			set: function(value) {
				this._bold = value;
				invalidate(this);
			}
		},
		italic: {
			get: function() {
				return this._italic;
			},
			set: function(value) {
				this._italic = value;
				invalidate(this);
			}
		},
		size: {
			get: function() {
				return this._size;
			},
			set: function(value) {
				this._size = value;
				invalidate(this);
			}
		},
		family: {
			get: function() {
				return this._family;
			},
			set: function(value) {
				this._family = value;
				invalidate(this);
			}
		}
	});

	Font.prototype.toString = function() {
		// CSS font syntax: font-style font-variant font-weight font-size/line-height font-family;
		if (this._cssProperty === null) {
			var properties = [];
			if (this._italic) {
				properties.push("italic");
			}
			if (this._bold) {
				properties.push("bold");
			}
			properties.push(this._size.toString() + "px");
			properties.push(this._family);
			this._cssProperty = properties.join(" ");
		}
		return this._cssProperty;
	};

	return Font;
}());
