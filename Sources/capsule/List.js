// Requires: capsule.js
// Requires: utilities.js

capsule.List = (function() {
	"use strict";

	// Aliases
	var applyDataDescriptor = capsule.utilities.applyDataDescriptor;

	var List = function() {
		this._items = [];

		applyDataDescriptor(this);
	};

	capsule.utilities.defineAccessorProperties(List.prototype, {
		count: {
			get: function() {
				return this._items.length;
			}
		}
	});

	List.prototype.add = function(item) {
		this._items.push(item);
		return this;
	};

	List.prototype.insert = function(index, item) {
		var items = this._items;
		if (index > items.count - 1) {
			this.add(item);
		}
		items.splice(index, 0, item);
		return this;
	};

	List.prototype.getItemAt = function(index) {
		return this._items[index];
	};

	List.prototype.getIndexOf = function(item) {
		return this._items.indexOf(item);
	};

	List.prototype.getFirst = function() {
		return this._items[0];
	};

	List.prototype.getLast = function() {
		var items = this._items;
		return items[items.length - 1];
	};

	List.prototype.find = function(predicate) {
		var i;
		var count = this.count;
		var items = this._items;
		for (i = 0; i < count; i += 1) {
			if (predicate(items[i])) {
				return items[i];
			}
		}
	};

	List.prototype.findAll = function(predicate) {
		var i;
		var results = [];
		var count = this.count;
		var items = this._items;
		for (i = 0; i < count; i += 1) {
			if (predicate(items[i])) {
				results.push(items[i]);
			}
		}
		return results;
	};

	List.prototype.reverse = function() {
		this._items.reverse();
		return this;
	};

	List.prototype.clear = function() {
		this._items = [];
		return this;
	};

	List.prototype.removeAt = function(index) {
		var item = this._items;
		if (index >= 0) {
			item.splice(index, 1);
		}
		return this;
	};

	List.prototype.remove = function(item) {
		this.removeAt(this._items.indexOf(item));
		return this;
	};

	List.prototype.clone = function() {
		var list = new List();
		list._items = this._items.slice(0);
		return list;
	};

	List.prototype.forEach = function(callback) {
		this._items.forEach(callback);
		return this;
	};

	return List;
}());
