// Requires: capsule.js

capsule.utilities = (function() {
	"use strict";

	var utilities = Object.create(null);

	// Returns a value indicating whether the given name
	// beings to a writable member.
	var isWritable = function(name) {
		// True if the name is not all upper case.
		return name.toLocaleUpperCase() !== name;
	};

	// Returns a value indicating whether the given name
	// belongs to an enumerable member.
	var isEnumerable = function(name) {
		// True if the name does not start with an underscore.
		return name.charAt(0) !== "_";
	};

	// The accessor function used when none is provided.
	var defaultAccessor = function() {
		throw new Error("Accessor is not defined.");
	};

	// Iterates through each key in the given object and applies
	// data descriptors based on the key's name.
	utilities.applyDataDescriptor = function(object) {
		Object.getOwnPropertyNames(object).forEach(function(key) {
			Object.defineProperty(object, key, {
				writable:   isWritable(key),
				enumerable: isEnumerable(key)
			});
		});
	};

	// Defines the accessor properties for the given object.
	utilities.defineAccessorProperties = function(object, accessors) {
		Object.getOwnPropertyNames(accessors).forEach(function(key) {
			if (typeof accessors[key].get !== "function") {
				throw new Error("Accessor descriptors must have a 'get' function.");
			}

			Object.defineProperty(object, key, {
				enumerable: true,
				get:        accessors[key].get,
				set:        accessors[key].set || defaultAccessor
			});
		});
	};

	return utilities;
}());
