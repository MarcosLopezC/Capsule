// Requires: capsule.js
// Requires: utilities.js
// Requires: Style.js
// Requires: Font.js
// Requires: Vector.js

capsule.Text = (function() {
	"use strict";

	var Text = function(value, font, style) {
		this.value    = value || "";
		this.font     = font  || new capsule.Font();
		this.style    = style || new capsule.Style();
		this.position = new capsule.Vector();
	};

	Text.prototype.draw = function(context) {
		context = context || capsule.game.context;

		var value    = this.value;
		var font     = this.font;
		var style    = this.style;
		var position = this.position;

		context.save();

		style.apply(context);
		font.apply(context);

		context.fillText(value, position.x, position.y);

		if (style.strokeThickness > 0) {
			context.strokeText(value, position.x, position.y);
		}

		context.restore();

		return this;
	};

	return Text;
}());
