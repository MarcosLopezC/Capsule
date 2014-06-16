// Requires: capsule.js
// Requires: utilities.js

capsule.Sound = (function() {
	"use strict";

	var Sound = function(path, voices) {
		var audio      = null;
		var audioArray = [];
		var i;
		var length = voices || 10;
		for (i = 0; i < length; i += 1) {
			audio = new Audio();
			audio.preload = "auto";
			audio.src     = path;
			audioArray[i] = audio;
		}
		this._audioArray = audioArray;
		this._index      = 0;

		capsule.utilities.applyDataDescriptor(this);
	};

	var advanceIndex = function(self) {
		self._index = (self._index + 1) % self._audioArray.length;
	};

	Sound.prototype.play = function() {
		advanceIndex(this);
		this._audioArray[this._index].play();
		return this;
	};

	Sound.prototype.stop = function() {
		this._audioArray.forEach(function(audio) {
			audio.pause();
			audio.position = 0;
		});
		return this;
	};

	capsule.utilities.defineAccessorProperties(Sound.prototype, {
		isReady: {
			get: function() {
				var audio = this._audioArray[0];
				return audio.readyState === audio.HAVE_ENOUGH_DATA;
			}
		},
		isPaused: {
			get: function() {
				var array = this._audioArray;
				var i;
				var length = array.length;
				for (i = 0; i < length; i += 1) {
					if (!array[i].paused) {
						return false;
					}
				}
				return true;
			}
		},
		volume: {
			get: function() {
				return this._audioArray[0].volume;
			},
			set: function(value) {
				this._audioArray.forEach(function(audio) {
					audio.volume = value;
				});
			}
		},
		duration: {
			get: function() {
				return this._audioArray[0].duration;
			}
		},
		speed: {
			get: function() {
				return this._audioArray.playbackRate;
			},
			set: function(value) {
				this._audioArray.forEach(function(audio) {
					audio.playbackRate = value;
				});
			}
		}
	});

	return Sound;
}());
