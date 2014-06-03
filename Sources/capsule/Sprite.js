// Requires: capsule.js
// Requires: utilities.js
// Requires: Vector.js

capsule.Sprite = (function() {
	"use strict";

	var Sprite = function(imagePath, origin) {
		this._image = new Image();
		this._image.src = imagePath;

		this.origin = origin || new capsule.Vector();
	};

	Sprite.prototype.isLoaded = null;
	Sprite.prototype.width    = null;
	Sprite.prototype.height   = null;

	capsule.utilities.defineAccessorProperties(Sprite.prototype, {
		isLoaded: {
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

	Sprite.prototype.draw = function(context, position, rotation, scale) {
		context.save();

		context.translate(position.x, position.y);

		if (rotation) {
			context.rotate(rotation);
		}

		if (scale) {
			context.scale(scale.x, scale.y);
		}

		context.drawImage(this._image, 0 - this.origin.x, 0 - this.origin.y);

		context.restore();

		return this;
	};

	Sprite.prototype.drawClip =	function(context, clip, position, rotation, scale) {
		context.save();

		context.translate(position.x, position.y);

		if (rotation) {
			context.rotate(rotation);
		}

		if (scale) {
			context.scale(scale.x, scale.y);
		}

		context.drawImage(this._image,
			clip.position.x, clip.position.y,
			clip.width, clip.height,
			this.origin.x, this.origin.y,
			clip.width, clip.height);

		context.restore();

		return this;
	};

	return Sprite;
}());
