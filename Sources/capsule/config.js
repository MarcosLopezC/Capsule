// Requires: capsule.js
// Requires: utilities.js

capsule.config = (function() {
	"use strict";

	var config = {
		ID_CANVAS:     "graphics",
		ID_FULLSCREEN: "fullscreen"
	};

	capsule.utilities.applyDataDescriptor(config);

	return config;
}());
