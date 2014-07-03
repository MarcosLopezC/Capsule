// Requires: capsule.js
// Requires: utilities.js

capsule.Stopwatch = (function() {
	"use strict";

	// Aliases
	var now                 = Date.now;
	var applyDataDescriptor = capsule.utilities.applyDataDescriptor;

	var Stopwatch = function() {
		this._startTime = 0;
		this._elapsed   = 0;
		this._isRunning = false;

		applyDataDescriptor(this);
	};

	capsule.utilities.defineAccessorProperties(Stopwatch.prototype, {
		elapsed: {
			get: function() {
				if (this._isRunning) {
					return this._elapsed + (now() - this._startTime);
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
			this._startTime = now();
			this._isRunning = true;
		}
		return this;
	};

	Stopwatch.prototype.stop = function() {
		if (this._isRunning) {
			this._elapsed += now() - this._startTime;
			this._isRunning = false;
		}
		return this;
	};

	Stopwatch.prototype.reset = function() {
		if (this._isRunning) {
			this._startTime = now();
		}
		this._elapsed = 0;
		return this;
	};

	Stopwatch.prototype.restart = function() {
		this.reset();
		this.start();
		return this;
	};

	return Stopwatch;
}());
