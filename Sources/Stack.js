/*
	Defines the Stack object and its methods.
*/

"use strict";

var descriptor = require("./descriptor.js");

// Represents a stack of items.
var Stack = module.exports = function() {
	this._items = [];
};

var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(Stack.prototype, key, accessor);
};

// Gets the number of items in the stack.
defineAccessor("count", {
	get: function() {
		return this._items.length;
	}
});

// Pops the item on top of the stack.
Stack.prototype.pop = function() {
	return this._items.pop();
};

// Pushes the given item to the top of the stack.
Stack.prototype.push = function(item) {
	this._items.push(item);
	return this;
};

// Gets the items on top of the stack without popping it.
Stack.prototype.peek = function() {
	var items = this._items;
	return items[items.length - 1];
};

// Gets the item at the given index.
Stack.prototype.getItemAt = function(index) {
	return this._items[index];
};

// Clears the contents of the stack.
Stack.prototype.clear = function() {
	this._items = [];
	return this;
};

// Returns a shallow copy of the stack.
Stack.prototype.clone = function() {
	var stack = new Stack();
	stack._items = this._items.slice(0);
	return stack;
};

// Iterates through all the items in the stack, passing them to the callback function.
Stack.prototype.forEach = function(callback) {
	this._items.forEach(callback);
	return this;
};
