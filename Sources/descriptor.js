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
