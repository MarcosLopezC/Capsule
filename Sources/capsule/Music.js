// Requires: capsule.js
// Requires: utilities.js

capsule.Music = (function() {
	"use strict";

	var Music = function(path) {
		var audio = new Audio();
		audio.preload = "auto";
		audio.src   = path;
		audio.loop  = true;
		this._audio = audio;

		capsule.utilities.applyDataDescriptor(this);
	};

	Music.prototype.play = function() {
		this._audio.play();
	};

	Music.prototype.pause = function() {
		this._audio.pause();
	};

	Music.prototype.stop = function() {
		this.pause();
		this.position = 0;
	};

	Music.prototype.isReady  = null;
	Music.prototype.isPaused = null;
	Music.prototype.volume   = null;
	Music.prototype.duration = null;
	Music.prototype.position = null;
	Music.prototype.speed    = null;
	Music.prototype.loop     = null;

	capsule.utilities.defineAccessorProperties(Music.prototype, {
		isReady: {
			get: function() {
				var audio = this._audio;
				return audio.readyState === audio.HAVE_ENOUGH_DATA;
			}
		},
		isPaused: {
			get: function() {
				return this._audio.paused;
			}
		},
		volume: {
			get: function() {
				return this._audio.volume;
			},
			set: function(value) {
				this._audio.volume = value;
			}
		},
		duration: {
			get: function() {
				return this._audio.duration;
			}
		},
		position: {
			get: function() {
				return this._audio.currentTime;
			},
			set: function(value) {
				this._audio.currentTime = value;
			}
		},
		speed: {
			get: function() {
				return this._audio.playbackRate;
			},
			set: function(value) {
				this._audio.playbackRate = value;
			}
		},
		loop: {
			get: function() {
				return this._audio.loop;
			},
			set: function(value) {
				this._audio.loop = value;
			}
		}
	});

	return Music;
}());