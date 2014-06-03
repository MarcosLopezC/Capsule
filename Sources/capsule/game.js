// Requires: capsule.js
// Requires: utilities.js
// Requires: config.js

capsule.game = (function() {
	"use strict";

	var game = Object.create(null);

	var drawFunc   = null;
	var updateFunc = null;
	var isRunning  = false;
	var context    = null;

	var requestAnimationFrame = (function() {
		return (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			}
		);
	}());

	game.run = function() {
		if (isRunning) {
			throw new Error("Game is already running.");
		}
		if (typeof updateFunc !== "function") {
			throw new Error("onUpdate has to be of type 'function'. It cannot be null or undefined.");
		}
		if (typeof drawFunc !== "function") {
			throw new Error("onDraw has to be of type 'function'. It cannot be null of undefined.");
		}

		var drawLoop = function() {
			if (isRunning) {
				drawFunc();
				requestAnimationFrame(drawLoop);
			}
		};

		var updateLoop = function() {
			if (isRunning) {
				updateFunc();
				window.setTimeout(updateLoop, 5);
			}
		};

		context   = document.getElementById(capsule.config.ID_CANVAS).getContext("2d");
		isRunning = true;

		updateLoop();
		drawLoop();
	};

	game.stop = function() {
		if (!isRunning) {
			throw new Error("Game cannot be stopped because is not running.");
		}

		context = null;
		isRunning = false;
	};

	game.onDraw    = null;
	game.onUpdate  = null;
	game.isRunning = null;
	game.context   = null;

	capsule.utilities.defineAccessorProperties(game, {
		onDraw: {
			get: function() {
				return drawFunc;
			},
			set: function(value) {
				if (isRunning) {
					throw new Error("onDraw cannot be changed while the game is running.");
				}
				drawFunc = value;
			}
		},
		onUpdate: {
			get: function() {
				return updateFunc;
			},
			set: function(value) {
				if (isRunning) {
					throw new Error("onUpdate cannot be changed while the game is running.");
				}
				updateFunc = value;
			}
		},
		isRunning: {
			get: function() {
				return isRunning;
			}
		},
		context: {
			get: function() {
				return context;
			}
		}
	});

	return game;
}());
