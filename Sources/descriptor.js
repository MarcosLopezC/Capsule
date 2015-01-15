/*
	Contains functions to help define property descriptors.
*/

"use strict";

exports.defineConstant = function(object, key, value) {
	Object.defineProperty(object, key, {
		value: value,
		writable: false
	});
};

exports.defineAccessor = function(object, key, accessor) {
	Object.defineProperty(object, key, {
		get: accessor.get,
		set: accessor.set || function() {
			throw new Error("This property does not have setter.");
		}
	});
};
