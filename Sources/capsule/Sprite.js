// Requires: capsule.js
// Requires: utilities.js
// Requires: Vector.js

capsule.Sprite = (function() {
	"use strict";

	var Sprite = function(path, origin) {
		this.origin   = origin || new capsule.Vector();
		this.position = new capsule.Vector();
		this.rotation = 0;
		this.scale    = 1;

		var image = new Image();
		if (origin) {
			var self = this;
			image.addEventListener("load", function() {
				self.origin.x = image.width  / 2;
				self.origin.y = image.height / 2;
			});
		}
		image.src = path;
		this._image = image;

		capsule.utilities.applyDataDescriptor(this);
	};

	Sprite.prototype.isReady = null;
	Sprite.prototype.width   = null;
	Sprite.prototype.height  = null;

	capsule.utilities.defineAccessorProperties(Sprite.prototype, {
		isReady: {
			get: function() {
				// Image width and height is 0 until the image is loaded.
				return this._image.width + this._image.height !== 0;
			}
		},
		width: {
			get: function() {
				return this._image.width;
			}
		},
		height: {
			get: function() {
				return this._image.height;
			}
		}
	});

	Sprite.prototype.draw = function(context) {
		context.save();

		var origin   = this.origin;
		var position = this.position;
		var rotation = this.rotation;
		var scale    = this.scale;

		context.translate(position.x, position.y);

		if (rotation !== 0) {
			context.rotate(rotation);
		}

		if (scale !== 1) {
			context.scale(scale, scale);
		}

		context.drawImage(this._image, 0 - origin.x, 0 - origin.y);

		context.restore();

		return this;
	};

	return Sprite;
}());
