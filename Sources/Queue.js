/*
	Defines the Queue object and its methods.
*/

"use strict";

var descriptor = require("./descriptor.js");

// Represents a queue of items.
var Queue = module.exports = function() {
	this._items = [];
};

var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(Queue.prototype, key, accessor);
};

// Gets the number of items in the queue.
defineAccessor("count", {
	get: function() {
		return this._items.length;
	}
});

// Pops the next items in the queue.
Queue.prototype.pop = function() {
	return this._items.shift();
};

// Pushes the given item to the end of the queue.
Queue.prototype.push = function(item) {
	this._items.push(item);
	return this;
};

// Gets the next in the queue without popping it.
Queue.prototype.peek = function() {
	return this._items[0];
};

// Gets the item at the given index.
Queue.prototype.getItemAt = function(index) {
	return this._items[index];
};

// Clears the contents of the queue.
Queue.prototype.clear = function() {
	this._items = [];
	return this;
};

// Returns a shallow copy of the queue.
Queue.prototype.clone = function() {
	var queue = new Queue();
	queue._items = this._items.slice(0);
	return queue;
};

// Iterates through all the items in the list, passing them to the callback function.
Queue.prototype.forEach = function(callback) {
	this._items.forEach(callback);
	return this;
};
