// Requires: capsule.js
// Requires: utilities.js

capsule.Vector = (function() {
	"use strict";

	var Vector = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};

	capsule.utilities.defineAccessorProperties(Vector.prototype, {
		length2: {
			get: function() {
				return (this.x * this.x) + (this.y * this.y);
			}
		},
		length: {
			get: function() {
				return Math.sqrt(this.length2);
			},
			set: function(value) {
				this.setPolar(null, value);
			}
		},
		angle: {
			get: function() {
				return Math.atan2(this.y, this.x);
			},
			set: function(value) {
				return this.setPolar(value, null);
			}
		}
	});

	Vector.prototype.getDistanceTo2 = function(vector) {
		var x = this.x - vector.x;
		var y = this.y - vector.y;
		return (x * x) + (y * y);
	};

	Vector.prototype.getDistanceTo = function(vector) {
		return Math.sqrt(this.getDistanceTo2(vector));
	};

	Vector.prototype.setPolar = function(angle, length) {
		if (angle === null) {
			angle = this.angle;
		}
		if (length === null) {
			length = this.length;
		}
		this.x = length * Math.cos(angle);
		this.y = length * Math.sin(angle);
		return this;
	};

	Vector.prototype.add = function(vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	};

	Vector.prototype.scale = function(factor) {
		this.x *= factor;
		this.y *= factor;
		return this;
	};

	Vector.prototype.cross = function(vector) {
		return (this.x * vector.y) - (this.y * vector.x);
	};

	Vector.prototype.dot = function(vector) {
		return (this.x * vector.x) + (this.y * vector.y);
	};

	Vector.prototype.getAngleBetween = function(vector) {
		var lengthProduct = this.getLength() * vector.getLength();
		return Math.acos(this.dot(vector) / lengthProduct);
	};

	Vector.prototype.normalize = function() {
		var length = this.length;
		this.x = this.x / length;
		this.y = this.y / length;
		return this;
	};

	Vector.prototype.clone = function() {
		return new Vector(this.x, this.y);
	};

	Vector.prototype.reverse = function() {
		this.x *= -1;
		this.y *= -1;
		return this;
	};

	return Vector;
}());
