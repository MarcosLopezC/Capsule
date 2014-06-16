// Requires: capsule.js
// Requires: utilities.js

capsule.Stopwatch = (function() {
	"use strict";

	var Stopwatch = function() {
		this._startTime = 0;
		this._elapsed   = 0;
		this._isRunning = false;

		capsule.utilities.applyDataDescriptor(this);
	};

	capsule.utilities.defineAccessorProperties(Stopwatch.prototype, {
		elapsed: {
			get: function() {
				if (this._isRunning) {
					return this._elapsed + (Date.now() - this._startTime);
				}
				else {
					return this._elapsed;
				}
			}
		},
		isRunning: {
			get: function() {
				return this._isRunning;
			}
		}
	});

	Stopwatch.prototype.start = function() {
		if (!this._isRunning) {
			this._startTime = Date.now();
			this._isRunning = true;
		}
	};

	Stopwatch.prototype.stop = function() {
		if (this._isRunning) {
			this._elapsed += Date.now() - this._startTime;
			this._isRunning = false;
		}
	};

	Stopwatch.prototype.reset = function() {
		if (this._isRunning) {
			this._startTime = Date.now();
		}
		this._elapsed = 0;
	};

	Stopwatch.prototype.restart = function() {
		this.reset();
		this.start();
	};

	return Stopwatch;
}());
