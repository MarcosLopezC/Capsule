/*
	Defines the List object and it's methods.
*/

"use strict";

var descriptor = require("./descriptor.js");

// Represents a list of items.
var List = module.exports = function() {
	this._items = [];
};

var defineAccessor = function(key, accessor) {
	descriptor.defineAccessor(List.prototype, key, accessor);
};

// Gets the number of items in the list.
defineAccessor("count", {
	get: function() {
		return this._items.length;
	}
});

// Gets the first item in the list.
defineAccessor("first", {
	get: function() {
		return this._items[0];
	}
});

// Gets the last item in the list.
defineAccessor("last", {
	get: function() {
		var items = this._items;
		return items[items.length - 1];
	}
});

// Adds an item at the end of the list.
List.prototype.add = function(item) {
	this._items.push(item);
	return this;
};

// Inserts an item at the given index in the list.
List.prototype.insert = function(item, index) {
	index = index || 0;
	var items = this._items;
	if (index > items.length - 1) {
		this.add(item);
	}
	items.splice(index, 0, item);
	return this;
};

// Gets the item at the given index.
List.prototype.getItemAt = function(index) {
	return this._items[index];
};

// Reverses the order of the list.
List.prototype.reverse = function() {
	this._items.reverse();
	return this;
};

// Clears all the items in the list.
List.prototype.clear = function() {
	this._items = [];
	return this;
};

// Removes an item at the given index from the list.
List.prototype.removeAt = function(index) {
	if (index >= 0) {
		this._items.splice(index, 1);
	}
	return this;
};

// Removes all the occurrences of the given item from the list.
List.prototype.remove = function(item) {
	var items = this._items;
	var len   = items.length;
	for (var i = 0; i < len; i += 1) {
		if (items[i] === item) {
			items.splice(i, 1);
		}
	}
	return this;
};

// Creates a shallow copy of the list.
List.prototype.clone = function() {
	var list = new List();
	list._items = this._items.slice(0);
	return list;
};

// Iterates through all the items in the list, passing them to the callback function.
List.prototype.forEach = function(callback) {
	this._items.forEach(callback);
	return this;
};

// Sorts the items in the list.
List.prototype.sort = function(compare) {
	this._items.sort(compare);
	return this;
};
