/*
	Defines the Sound object and its methods.
*/

"use strict";

var descriptor = require("./descriptor.js");

// Initializes a new instance of the Sound class.
var Sound = module.exports = function(path, voices) {
	this._samples = [];
	this._sampleIndex = 0;
	voices = voices || 10;
	var i, audio;
	for (i = 0; i < voices; i += 1) {
		audio         = new Audio();
		audio.preload = "auto";
		audio.src     = path;
		this._samples[i] = audio;
	}
};

// Gets the next audio sample from a Sound object.
var getNextSample = function(sound) {
	var samples = sound._samples;
	sound._sampleIndex += 1;
	sound._sampleIndex %= samples.length;
	return samples[sound._sampleIndex];
};

// Defines the accessors for the Sound class.
var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(Sound.prototype, key, accessor);
};

// Gets a value indicating whether the Sound is ready to be played.
defineAccessor("isReady", {
	get: function() {
		var sample = this._samples[0];
		return sample.readyState === sample.HAVE_ENOUGH_DATA;
	}
});

// Gets a value indicating whether the Sound is paused.
defineAccessor("isPaused", {
	get: function() {
		var samples = this._samples;
		var i, len = samples.length;
		for (i = 0; i < len; i += 1) {
			if (!samples[i].paused) {
				return false;
			}
		}
		return true;
	}
});

// Gets or sets the value of the Sound.
defineAccessor("volume", {
	get: function() {
		return this.samples[0].volume;
	},
	set: function(value) {
		this._samples.forEach(function(sample) {
			sample.volume = value;
		});
	}
});

// Gets the duration of the Sound.
defineAccessor("duration", {
	get: function() {
		return this._samples[0].duration;
	}
});

// Gets or sets the playback speed of the Sound.
defineAccessor("speed", {
	get: function() {
		return this._samples[0].playbackRate;
	},
	set: function(value) {
		this._samples.forEach(function(sample) {
			sample.playbackRate = value;
		});
	}
});

// Plays the Sound.
Sound.prototype.play = function() {
	getNextSample(this).play();
	return this;
};

// Stops playing the Sound.
Sound.prototype.stop = function() {
	this._samples.forEach(function(sample) {
		sample.pause();
		sample.position = 0;
	});
};
