// Requires: capsule.js
// Requires: Vector.js

capsule.input = (function() {
	"use strict";

	var i;
	var keyState = [];
	var mousePosition = new capsule.Vector();

	var keyDownHandler = function(e) {
		keyState[e.which] = true;
	};

	var keyUpHandler = function(e) {
		keyState[e.which] = false;
	};

	var mousemoveHandler = function(e) {
		mousePosition.x = e.clientX;
		mousePosition.y = e.clientY;
	};

	var contextmenuHandler = function(e) {
		e.preventDefault();
	};

	for (i = 0; i < 255; i += 1) {
		keyState[i] = false;
	}

	document.addEventListener("DOMContentLoaded", function() {
		document.addEventListener("keydown",     keyDownHandler);
		document.addEventListener("keyup",       keyUpHandler);
		document.addEventListener("mousemove",   mousemoveHandler);
		document.addEventListener("mousedown",   keyDownHandler);
		document.addEventListener("mouseup",     keyUpHandler);
		document.addEventListener("contextmenu", contextmenuHandler);
	});

	return {
		isButtonPressed: function(buttonCode) {
			return keyState[buttonCode];
		},
		getMousePosition: function() {
			var position = mousePosition.clone();
			if (capsule.game.context) {
				var element = capsule.game.context.canvas;
				position.x -= element.offsetLeft;
				position.y -= element.offsetTop;
			}
			return position;
		}
	};
}());
