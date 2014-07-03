// Requires: capsule.js
// Requires: utilities.js

capsule.Stack = (function() {
	"use strict";

	// Aliases
	var applyDataDescriptor = capsule.utilities.applyDataDescriptor;

	var Stack = function() {
		this._items = [];

		applyDataDescriptor(this);
	};

	capsule.utilities.defineAccessorProperties(Stack.prototype, {
		count: {
			get: function() {
				return this._items.length;
			}
		}
	});

	Stack.prototype.pop = function() {
		return this._items.pop();
	};

	Stack.prototype.push = function(item) {
		this._items.push(item);
		return this;
	};

	Stack.prototype.peek = function() {
		var items = this._items;
		return items[items.length - 1];
	};

	Stack.prototype.clear = function() {
		this._items = [];
		return this;
	};

	Stack.prototype.clone = function() {
		var stack = new Stack();
		stack._items = this._items.slice(0);
		return stack;
	};

	Stack.prototype.forEach = function(callback) {
		this._items.forEach(callback);
		return this;
	};

	return Stack;
}());
