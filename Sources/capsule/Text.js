// Requires: capsule.js
// Requires: utilities.js
// Requires: Style.js
// Requires: Font.js
// Requires: Vector.js

capsule.Text = (function() {
	"use strict";

	// Aliases
	var Font   = capsule.Font;
	var Style  = capsule.Style;
	var Vector = capsule.Vector;
	var game   = capsule.game;

	var Text = function(value, font, style) {
		this.value    = value || "";
		this.font     = font  || new Font();
		this.style    = style || new Style();
		this.position = new Vector();
	};

	Text.prototype.draw = function(context) {
		context = context || game.context;

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
