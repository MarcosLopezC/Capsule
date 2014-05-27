// Capsule Framework by Marcos López C.

var Capsule = (function() {
	"use strict";

	var Capsule = {};

	var applyDataDescriptor = (function() {
		var isConstant = function(name) {
			if (name.toLocaleUpperCase() === name) {
				return true;
			}
			else {
				return false;
			}
		};

		var isPrivate = function(name) {
			if (name.charAt(0) === "_") {
				return true;
			}
			else {
				return false;
			}
		};

		return function(object) {
			var descriptor = {
				configurable: false
			};

			Object.getOwnPropertyNames(object).forEach(function(key) {
				if (isConstant(key)) {
					descriptor.writable = false;
				}

				if (isPrivate(key)) {
					descriptor.enumerable = false;
				}

				Object.defineProperty(object, key, descriptor);
			});
		};
	}());

	var defineAccessorProperties = function(object, accessors) {
		Object.getOwnPropertyNames(accessors).forEach(function(key) {
			if (typeof accessors[key].get !== "function") {
				throw new Error("Accessor descriptors must have a 'get' property.");
			}
			Object.defineProperty(object, key, {
				enumerable: true,
				get:        accessors[key].get,
				set:        accessors[key].set
			});
		});
	};

	Capsule.Config = (function() {
		var Config = {
			ID_CANVAS:     "graphics",
			ID_FULLSCREEN: "fullscreen"
		};

		applyDataDescriptor(Config);

		return Config;
	}());

	Capsule.ButtonCode = (function() {
		var ButtonCode = {
			CLICK_LEFT:      1,
			CLICK_MIDDLE:    2,
			CLICK_RIGHT:     3,

			//SCROLL_UP:       5,
			//SCROLL_DOWN:     6,

			BACKSPACE:       8,
			TAB:             9,
			ENTER:           13,
			SHIFT:           16,
			CTRL:            17,
			ALT:             18,
			PAUSE_BREAK:     19,
			CAPS_LOCK:       20,
			ESCAPE:          27,

			INSERT:          45,
			DELETE:          46,
			PAGE_UP:         33,
			PAGE_DOWN:       34,
			END:             35,
			HOME:            36,

			ARROW_LEFT:      37,
			ARROW_UP:        38,
			ARROW_RIGHT:     39,
			ARROW_DOWN:      40,

			NUMBER_0:        48,
			NUMBER_1:        49,
			NUMBER_2:        50,
			NUMBER_3:        51,
			NUMBER_4:        52,
			NUMBER_5:        53,
			NUMBER_6:        54,
			NUMBER_7:        55,
			NUMBER_8:        56,
			NUMBER_9:        57,

			A:               65,
			B:               66,
			C:               67,
			D:               68,
			E:               69,
			F:               70,
			G:               71,
			H:               72,
			I:               73,
			J:               74,
			K:               75,
			L:               76,
			M:               77,
			N:               78,
			O:               79,
			P:               80,
			Q:               81,
			R:               82,
			S:               83,
			T:               84,
			U:               85,
			V:               86,
			W:               87,
			X:               88,
			Y:               89,
			Z:               90,

			WINDOW_LEFT:     91,
			WINDOW_RIGHT:    92,
			MENU:            93,

			NUMPAD_0:        96,
			NUMPAD_1:        97,
			NUMPAD_2:        98,
			NUMPAD_3:        99,
			NUMPAD_4:        100,
			NUMPAD_5:        101,
			NUMPAD_6:        103,
			NUMPAD_7:        104,
			NUMPAD_8:        105,
			NUMPAD_9:        106,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_ADD:      107,
			NUMPAD_SUBTRACT: 109,
			NUMPAD_POINT:    110,
			NUMPAD_DIVIDE:   111,

			F1:              112,
			F2:              113,
			F3:              114,
			F4:              115,
			F5:              116,
			F6:              117,
			F7:              118,
			F8:              119,
			F9:              120,
			F10:             121,
			F11:             122,
			F12:             123,

			NUM_LOCK:        144,
			SCROLL_LOCK:     145,
			SEMI_COLON:      186,
			EQUALS:          187,
			COMMA:           188,
			DASH:            189,
			PERIOD:          190,
			SLASH_FORWARD:   191,
			TILDE:           192,
			BRACKET_OPEN:    219,
			SLASH_BACK:      220,
			BRACKET_CLOSE:   221,
			SINGLE_QUOTE:    222
		};

		applyDataDescriptor(ButtonCode);

		return ButtonCode;
	}());

	Capsule.Math = (function() {
		var CapsuleMath = Object.create(Math);

		CapsuleMath.TAU     = Math.PI * 2;
		CapsuleMath.HALF_PI = Math.PI / 2;

		CapsuleMath.ANGLE_RIGHT = CapsuleMath.TAU * 0.00;
		CapsuleMath.ANGLE_DOWN  = CapsuleMath.TAU * 0.25;
		CapsuleMath.ANGLE_LEFT  = CapsuleMath.TAU * 0.50;
		CapsuleMath.ANGLE_UP    = CapsuleMath.TAU * 0.75;

		applyDataDescriptor(CapsuleMath);

		// Gets the modulus.
		CapsuleMath.getModulus = function(dividend, divisor) {
			if (dividend > 0) {
				return dividend % divisor;
			}
			else {
				return ((dividend % divisor) + divisor) % divisor;
			}
		};

		// Gets a random angle.
		CapsuleMath.getRandomAngle = function() {
			return Math.random() * CapsuleMath.TAU;
		};

		// Gets a random number between min and max.
		CapsuleMath.getRandomNumber = function(min, max) {
			max = max || 1;
			min = min || 0;
			return (Math.random() * (max - min)) + min;
		};

		// Returns a value between min and max.
		CapsuleMath.getRange = function(value, min, max) {
			if (value < min) {
				return min;
			}
			else if (value > max) {
				return max;
			}
			else {
				return value;
			}
		};

		return CapsuleMath;
	}());

	Capsule.Vector = (function() {
		var Vector = function(x, y) {
			this.x = x || 0;
			this.y = y || 0;
		};

		Vector.getDistanceBetween2 = function(vector1, vector2) {
			var x = vector1.x - vector2.x;
			var y = vector1.y - vector2.y;
			return (x * x) + (y * y);
		};

		Vector.getDistanceBetween = function(vector1, vector2) {
			return Math.sqrt(Vector.getDistanceBetween(vector1, vector2));
		};

		Vector.prototype.length2 = null;
		Vector.prototype.length  = null;
		Vector.prototype.angle   = null;

		defineAccessorProperties(Vector.prototype, {
			length2: {
				get: function() {
					return (this.x * this.x) + (this.y * this.y);
				}
			},
			length: {
				get: function() {
					return Math.sqrt(this.length2);
				},
				set: function(value) {
					this.setPolar(null, value);
				}
			},
			angle: {
				get: function() {
					return Math.atan2(this.y, this.x);
				},
				set: function(value) {
					return this.setPolar(value, null);
				}
			}
		});

		Vector.prototype.setPolar = function(angle, length) {
			if (angle === null) {
				angle = this.angle;
			}
			if (length === null) {
				length = this.length;
			}
			this.x = length * Math.cos(angle);
			this.y = length * Math.sin(angle);
			return this;
		};

		Vector.prototype.addVector = function(vector) {
			this.x += vector.x;
			this.y += vector.y;
			return this;
		};

		Vector.prototype.scale = function(factor) {
			this.x *= factor;
			this.y *= factor;
			return this;
		};

		Vector.prototype.cross = function(vector) {
			return (this.x * vector.y) - (this.y * vector.x);
		};

		Vector.prototype.dot = function(vector) {
			return (this.x * vector.x) + (this.y * vector.y);
		};

		Vector.prototype.getAngleBetween = function(vector) {
			var lengthProduct = this.getLength() * vector.getLength();
			return Math.acos(this.dot(vector) / lengthProduct);
		};

		Vector.prototype.normalize = function() {
			var length = this.getLength();
			this.x = this.x / length;
			this.y = this.y / length;
			return this;
		};

		Vector.prototype.rotate = function(angle) {
			return this.setAngle(this.angle + angle);
		};

		Vector.prototype.clone = function() {
			return new Vector(this.x, this.y);
		};

		Vector.prototype.reverse = function() {
			this.x *= -1;
			this.y *= -1;
			return this;
		};

		return Vector;
	}());

	Capsule.Size = (function() {
		var Size = function(width, height) {
			this.width  = width  || 0;
			this.height = height || 0;
		};

		Size.prototype.isEmpty = function() {
			if (this.width === 0 && this.height === 0) {
				return true;
			}
			else {
				return false;
			}
		};

		Size.prototype.truncate = function() {
			this.width  = Math.floor(this.width);
			this.height = Math.floor(this.height);
		};

		return Size;
	}());

	Capsule.Stopwatch = (function() {
		var Stopwatch = function() {
			this._startTime = 0;
			this._elapsed   = 0;
			this._isRunning = false;

			applyDataDescriptor(this);
		};

		Stopwatch.prototype.elapsed   = null;
		Stopwatch.prototype.isRunning = null;

		defineAccessorProperties(Stopwatch.prototype, {
			elapsed: {
				get: function() {
					if (this._isRunning) {
						return this._elapsed + (Date.now() - this._startTime);
					}
					else {
						return this._elapsed;
					}
				}
			},
			isRunning: {
				get: function() {
					return this._isRunning;
				}
			}
		});

		Stopwatch.prototype.start = function() {
			if (!this._isRunning) {
				this._startTime = Date.now();
				this._isRunning = true;
			}
		};

		Stopwatch.prototype.stop = function() {
			if (this._isRunning) {
				this._elapsed += Date.now() - this._startTime;
				this._isRunning = false;
			}
		};

		Stopwatch.prototype.reset = function() {
			if (this._isRunning) {
				this._startTime = Date.now();
			}
			this._elapsed = 0;
		};

		Stopwatch.prototype.restart = function() {
			this.reset();
			this.start();
		};

		return Stopwatch;
	}());

	Capsule.Input = (function() {
		var i;
		var keyState = [];
		var mousePosition = new Capsule.Vector();

		var keyDownHandler = function(e) {
			keyState[e.which] = true;
		};

		var keyUpHandler = function(e) {
			keyState[e.which] = false;
		};

		var mousemoveHandler = function(e) {
			mousePosition.x = e.clientX;
			mousePosition.y = e.clientY;
		};

		var contextmenuHandler = function(e) {
			e.preventDefault();
		};

		for (i = 0; i < 255; i += 1) {
			keyState[i] = false;
		}

		document.addEventListener("DOMContentLoaded", function() {
			document.addEventListener("keydown",     keyDownHandler);
			document.addEventListener("keyup",       keyUpHandler);
			document.addEventListener("mousemove",   mousemoveHandler);
			document.addEventListener("mousedown",   keyDownHandler);
			document.addEventListener("mouseup",     keyUpHandler);
			document.addEventListener("contextmenu", contextmenuHandler);

			document.getElementById(Capsule.Config.ID_FULLSCREEN).addEventListener("click", function() {
				var canvas = document.getElementById(Capsule.Config.ID_CANVAS);
				(
					canvas.requestFullscreen       ||
					canvas.msRequestFullscreen     ||
					canvas.mozRequestFullScreen    ||
					canvas.webkitRequestFullscreen
				).call(canvas);
			});
		});

		return {
			isButtonPressed: function(buttonCode) {
				return keyState[buttonCode];
			},
			getMousePosition: function() {
				var position = mousePosition.clone();
				if (Capsule.Game.context) {
					var element = Capsule.Game.context.canvas;
					position.x -= element.offsetLeft;
					position.y -= element.offsetTop;
				}
				return position;
			}
		};
	}());

	Capsule.Stack = (function() {
		var Stack = function() {
			this._items = [];
			applyDataDescriptor(Stack);
		};

		Stack.prototype.count = null;
		Stack.prototype.top   = null;

		defineAccessorProperties(Stack.prototype, {
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

	Capsule.List = (function() {
		var List = function() {
			this._items = [];
			applyDataDescriptor(this);
		};

		List.prototype.count = null;

		defineAccessorProperties(List.prototype, {
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

		List.prototype.forEach = function(lambda) {
			this._items.forEach(lambda);
			return this;
		};

		return List;
	}());

	Capsule.Color = (function() {
		var Color = function(red, green, blue, alpha) {
			this.red   = red   || 0;
			this.green = green || 0;
			this.blue  = blue  || 0;
			this.alpha = alpha || 255;
		};

		Color.prototype.toString = function() {
			var range = Capsule.Math.getRange;
			var red   = range(this.red,   0, 255).toString(16);
			var green = range(this.green, 0, 255).toString(16);
			var blue  = range(this.blue,  0, 255).toString(16);
			var alpha = range(this.alpha, 0, 255).toString(16);
			return String.concat("rgba(", red, ", ", green, ", ", blue, ", ", alpha, ")");
		};

		return Color;
	}());

	Capsule.Game = (function() {
		var Game = {};

		var drawFunc   = null;
		var updateFunc = null;
		var isRunning  = false;
		var context    = null;

		var requestAnimationFrame = (function() {
			return (
				window.requestAnimationFrame       ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60);
				}
			);
		}());

		Game.run = function() {
			if (isRunning) {
				throw new Error("Game is already running.");
			}
			if (typeof updateFunc !== "function") {
				throw new Error("onUpdate has to be of type 'function'. It cannot be null or undefined.");
			}
			if (typeof drawFunc !== "function") {
				throw new Error("onDraw has to be of type 'function'. It cannot be null of undefined.");
			}

			var drawLoop = function() {
				if (isRunning) {
					drawFunc();
					requestAnimationFrame(drawLoop);
				}
			};

			var updateLoop = function() {
				if (isRunning) {
					updateFunc();
					window.setTimeout(updateLoop, 0);
				}
			};

			context = document.getElementById(Capsule.Config.ID_CANVAS).getContext("2d");
			isRunning = true;

			updateLoop();
			drawLoop();
		};

		Game.stop = function() {
			if (!isRunning) {
				throw new Error("Game cannot be stopped because is not running.");
			}

			context = null;
			isRunning = false;
		};

		Game.onDraw    = null;
		Game.onUpdate  = null;
		Game.isRunning = null;
		Game.context   = null;

		defineAccessorProperties(Game, {
			onDraw: {
				get: function() {
					return drawFunc;
				},
				set: function(value) {
					if (isRunning) {
						throw new Error("onDraw cannot be changed while the game is running.");
					}
					drawFunc = value;
				}
			},
			onUpdate: {
				get: function() {
					return updateFunc;
				},
				set: function(value) {
					if (isRunning) {
						throw new Error("onUpdate cannot be changed while the game is running.")
					}
					updateFunc = value;
				}
			},
			isRunning: {
				get: function() {
					return isRunning;
				}
			},
			context: {
				get: function() {
					return context;
				}
			}
		});

		return Game;
	}());

	return Capsule;
}());
