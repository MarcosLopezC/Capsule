// Requires: capsule.js
// Requires: utilities.js
// Requires: Stopwatch.js

capsule.game = (function() {
	"use strict";

	var game = Object.create(null);

	var MAX_LATENCY = 100;

	var startHandler  = null;
	var drawHandler   = null;
	var updateHandler = null;
	var resizeHandler = null;
	var isRunning     = false;
	var context       = null;
	var elapsedTimer  = new capsule.Stopwatch();
	var totalTimer    = new capsule.Stopwatch();

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

	var drawEvent = function() {
		if (isRunning) {
			drawHandler(context);
			requestAnimationFrame(drawEvent);
		}
	};

	var updateEvent = function() {
		if (isRunning) {
			updateHandler(elapsedTimer.elapsed, totalTimer.elapsed);
			elapsedTimer.reset();
			window.setTimeout(updateEvent, 5);
		}
	};

	var resizeEvent = function() {
		resizeHandler(game.windowSize);
	};

	game.run = function() {
		if (isRunning) {
			throw new Error("Game is already running.");
		}

		var canvas = document.getElementById("capsule") ||
			document.getElementsByTagName("canvas")[0];

		if (!canvas) {
			throw new Error("capsule.game cannot find a canvas to draw on.");
		}

		context = canvas.getContext("2d");

		isRunning = true;

		elapsedTimer.restart();
		totalTimer.start();

		if (typeof startHandler === "function") {
			startHandler(game);
		}

		if (typeof resizeHandler === "function") {
			resizeEvent();
			window.addEventListener("resize", resizeEvent);
		}

		if (typeof updateHandler === "function") {
			updateEvent();
		}

		if (typeof drawHandler === "function") {
			drawEvent();
		}
	};

	game.stop = function() {
		if (!isRunning) {
			throw new Error("Game cannot be stopped because is not running.");
		}

		window.removeEventListener("resize", resizeEvent);

		elapsedTimer.stop();
		totalTimer.stop();

		context   = null;
		isRunning = false;
	};

	capsule.utilities.applyDataDescriptor(game);

	capsule.utilities.defineAccessorProperties(game, {
		onStart: {
			get: function() {
				return startHandler;
			},
			set: function(value) {
				if (isRunning) {
					throw new Error("onStart cannot be changed while the game is running.");
				}
				startHandler = value;
			}
		},
		onDraw: {
			get: function() {
				return drawHandler;
			},
			set: function(value) {
				if (isRunning) {
					throw new Error("onDraw cannot be changed while the game is running.");
				}
				drawHandler = value;
			}
		},
		onUpdate: {
			get: function() {
				return updateHandler;
			},
			set: function(value) {
				if (isRunning) {
					throw new Error("onUpdate cannot be changed while the game is running.");
				}
				updateHandler = value;
			}
		},
		onResize: {
			get: function() {
				return resizeHandler;
			},
			set: function(value) {
				if (isRunning) {
					throw new Error("onResize cannot be changed while the game is running.");
				}
				resizeHandler = value;
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
		},
		elapsedTime: {
			get: function() {
				return Math.min(elapsedTimer.elapsed, MAX_LATENCY);
			}
		},
		totalTime: {
			get: function() {
				return totalTimer.elapsed;
			}
		},
		isRunningSlowly: {
			get: function() {
				if (isRunning) {
					return elapsedTimer.elapsed > MAX_LATENCY;
				}
			}
		},
		isFullscreen: {
			get: function() {
				return !!(
					document.fullscreenElement       ||
					document.mozFullScreenElement    ||
					document.webkitFullscreenElement ||
					document.msFullscreenElement
				);
			}
		},
		windowSize: {
			get: function() {
				if (isRunning) {
					return new capsule.Size(window.innerWidth, window.innerHeight);
				}
			}
		}
	});

	return game;
}());
