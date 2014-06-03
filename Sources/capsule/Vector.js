// Requires: capsule.js
// Requires: utilities.js

capsule.Vector = (function() {
	"use strict";

	var Vector = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};

	Vector.getDistanceBetween2 = function(vector1, vector2) {
		var x = vector1.x - vector2.x;
		var y = vector1.y - vector2.y;
		return (x * x) + (y * y);
	};

	Vector.getDistanceBetween = function(vector1, vector2) {
		return Math.sqrt(Vector.getDistanceBetween(vector1, vector2));
	};

	Vector.prototype.length2 = null;
	Vector.prototype.length  = null;
	Vector.prototype.angle   = null;

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

	Vector.prototype.addVector = function(vector) {
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
		var length = this.getLength();
		this.x = this.x / length;
		this.y = this.y / length;
		return this;
	};

	Vector.prototype.rotate = function(angle) {
		return this.setAngle(this.angle + angle);
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
