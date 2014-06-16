// Requires: capsule.js
// Requires: utilities.js

capsule.Queue = (function() {
	"use strict";

	var Queue = function() {
		this._items = [];
		capsule.utilities.applyDataDescriptor(this);
	};

	capsule.utilities.defineAccessorProperties(Queue.prototype, {
		count: {
			get: function() {
				return this._items.length;
			}
		}
	});

	Queue.prototype.pop = function() {
		return this._items.shift();
	};

	Queue.prototype.push = function(item) {
		this._items.push(item);
		return this;
	};

	Queue.prototype.peek = function() {
		return this._items[0];
	};

	Queue.prototype.clear = function() {
		this._items = [];
		return this;
	};

	Queue.prototype.clone = function() {
		var queue = new Queue();
		queue._items = this._items.slice(0);
		return queue;
	};

	Queue.prototype.forEach = function(callback) {
		this._items.forEach(callback);
		return this;
	};

	return Queue;
}());
