// Requires: capsule.js

capsule.Size = (function() {
	"use strict";

	var Size = function(width, height) {
		this.width  = width  || 0;
		this.height = height || 0;
	};

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
