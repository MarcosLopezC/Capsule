// Requires: capsule.js

capsule.utilities = Object.create(null);

capsule.utilities.applyDataDescriptor = (function() {
	"use strict";

	var isConstant = function(name) {
		if (name.toLocaleUpperCase() === name) {
			return true;
		}
		else {
			return false;
		}
	};

	var isPrivate = function(name) {
		if (name.charAt(0) === "_") {
			return true;
		}
		else {
			return false;
		}
	};

	return function(object) {
		var descriptor = {
			writable:     true,
			configurable: true,
			enumerable:   true
		};

		Object.getOwnPropertyNames(object).forEach(function(key) {
			if (isConstant(key)) {
				descriptor.writable = false;
			}

			if (isPrivate(key)) {
				descriptor.enumerable = false;
			}

			Object.defineProperty(object, key, descriptor);
		});
	};
}());

capsule.utilities.defineAccessorProperties = function(object, accessors) {
	"use strict";

	var defaultAccessor = function() {
		throw new Error("Accessor is not defined.");
	};

	Object.getOwnPropertyNames(accessors).forEach(function(key) {
		if (typeof accessors[key].get !== "function") {
			throw new Error("Accessor descriptors must have a 'get' property.");
		}

		Object.defineProperty(object, key, {
			enumerable: true,
			get:        accessors[key].get,
			set:        accessors[key].set || defaultAccessor
		});
	});
};
