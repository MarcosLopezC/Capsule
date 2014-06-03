// Requires: capsule.js
// Requires: utilities.js

capsule.Stack = (function() {
	"use strict";

	var Stack = function() {
		this._items = [];
		capsule.utilities.applyDataDescriptor(this);
	};

	Stack.prototype.count = null;
	Stack.prototype.top   = null;

	capsule.utilities.defineAccessorProperties(Stack.prototype, {
		count: {
			get: function() {
				return this._items.length;
			}
		},
		top: {
			get: function() {
				var items = this._items;
				return items[items.length - 1];
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

	Stack.prototype.clear = function() {
		this._items = [];
		return this;
	};

	Stack.prototype.clone = function() {
		var stack = new Stack();
		stack._items = this._items.slice(0);
		return stack;
	};

	Stack.prototype.forEach = function(lambda) {
		this._items.forEach(lambda);
		return this;
	};

	return Stack;
}());
