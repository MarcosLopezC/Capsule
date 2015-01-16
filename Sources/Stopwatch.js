/*
	Defines the Stopwatch object and its methods.
*/

"use strict";

var getTime = Date.now;
var descriptor = require("./descriptor.js");

// Represents a stopwatch that can keep track of time.
var Stopwatch = module.exports = function() {
	this._startTime = null;
	this._elapsed = 0;
	this._isRunning = false;
};

var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(Stopwatch.prototype, key, accessor);
};

// Gets the time elapsed since the stopwatch started, in milliseconds.
defineAccessor("elapsed", {
	get: function() {
		if (this._isRunning) {
			return this._elapsed + (getTime() - this._startTime);
		}
		else {
			return this._elapsed;
		}
	}
});

// Gets a value indicating whether the stopwatch is running.
defineAccessor("isRunning", {
	get: function() {
		return this._isRunning;
	}
});

// Starts keeping track of the elapsed time.
Stopwatch.prototype.start = function() {
	if (!this._isRunning) {
		this._startTime = getTime();
		this._isRunning = true;
	}
	return this;
};

// Stops the keeping track of the elapsed time.
Stopwatch.prototype.stop = function() {
	if (this._isRunning) {
		this._elapsed += getTime() - this._startTime;
		this._isRunning = false;
	}
	return this;
};

// Sets the elapsed time to 0.
Stopwatch.prototype.reset = function() {
	if (this._isRunning) {
		this._startTime = getTime();
	}
	this._elapsed = 0;
	return this;
};

// Restarts the stopwatch.
Stopwatch.prototype.restart = function() {
	this.reset();
	this.start();
	return this;
};
