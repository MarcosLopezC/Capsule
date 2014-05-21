// Capsule Framework by Marcos López C.

var Capsule = (function() {
	"use strict";

	var Capsule = {};

	Capsule.Config = (function() {
		var Config = {};

		var defineConst = function(key, value) {
			Object.defineProperty(Config, key, {
				value: value,
				enumerable: true
			});
		};

		defineConst("ID_CANVAS",     "graphics");
		defineConst("ID_FULLSCREEN", "fullscreen");

		return Config;
	}());

	Capsule.ButtonCode = (function() {
		var ButtonCode = {};

		var defineConst = function(key, value) {
			Object.defineProperty(ButtonCode, key, {
				value: value,
				enumerable: true
			});
		};

		defineConst("LEFT_CLICK",      1);
		defineConst("MIDDLE_CLICK",    2);
		defineConst("RIGHT_CLICK",     3);

		//defineConst("SCROLL_UP",       5);
		//defineConst("SCROLL_DOWN",     6);

		defineConst("BACKSPACE",       8);
		defineConst("TAB",             9);
		defineConst("ENTER",           13);
		defineConst("SHIFT",           16);
		defineConst("CTRL",            17);
		defineConst("ALT",             18);
		defineConst("PAUSE_BREAK",     19);
		defineConst("CAPS_LOCK",       20);
		defineConst("ESCAPE",          27);

		defineConst("INSERT",          45);
		defineConst("DELETE",          46);
		defineConst("PAGE_UP",         33);
		defineConst("PAGE_DOWN",       34);
		defineConst("END",             35);
		defineConst("HOME",            36);

		defineConst("ARROW_LEFT",      37);
		defineConst("ARROW_UP",        38);
		defineConst("ARROW_RIGHT",     39);
		defineConst("ARROW_DOWN",      40);

		defineConst("NUMBER_0",        48);
		defineConst("NUMBER_1",        49);
		defineConst("NUMBER_2",        50);
		defineConst("NUMBER_3",        51);
		defineConst("NUMBER_4",        52);
		defineConst("NUMBER_5",        53);
		defineConst("NUMBER_6",        54);
		defineConst("NUMBER_7",        55);
		defineConst("NUMBER_8",        56);
		defineConst("NUMBER_9",        57);

		defineConst("A",               65);
		defineConst("B",               66);
		defineConst("C",               67);
		defineConst("D",               68);
		defineConst("E",               69);
		defineConst("F",               70);
		defineConst("G",               71);
		defineConst("H",               72);
		defineConst("I",               73);
		defineConst("J",               74);
		defineConst("K",               75);
		defineConst("L",               76);
		defineConst("M",               77);
		defineConst("N",               78);
		defineConst("O",               79);
		defineConst("P",               80);
		defineConst("Q",               81);
		defineConst("R",               82);
		defineConst("S",               83);
		defineConst("T",               84);
		defineConst("U",               85);
		defineConst("V",               86);
		defineConst("W",               87);
		defineConst("X",               88);
		defineConst("Y",               89);
		defineConst("Z",               90);

		defineConst("LEFT_WINDOW",     91);
		defineConst("RIGHT_WINDOW",    92);
		defineConst("MENU",            93);

		defineConst("NUMPAD_0",        96);
		defineConst("NUMPAD_1",        97);
		defineConst("NUMPAD_2",        98);
		defineConst("NUMPAD_3",        99);
		defineConst("NUMPAD_4",        100);
		defineConst("NUMPAD_5",        101);
		defineConst("NUMPAD_6",        103);
		defineConst("NUMPAD_7",        104);
		defineConst("NUMPAD_8",        105);
		defineConst("NUMPAD_9",        106);
		defineConst("NUMPAD_MULTIPLY", 106);
		defineConst("NUMPAD_ADD",      107);
		defineConst("NUMPAD_SUBTRACT", 109);
		defineConst("NUMPAD_POINT",    110);
		defineConst("NUMPAD_DIVIDE",   111);

		defineConst("F1",              112);
		defineConst("F2",              113);
		defineConst("F3",              114);
		defineConst("F4",              115);
		defineConst("F5",              116);
		defineConst("F6",              117);
		defineConst("F7",              118);
		defineConst("F8",              119);
		defineConst("F9",              120);
		defineConst("F10",             121);
		defineConst("F11",             122);
		defineConst("F12",             123);

		defineConst("NUM_LOCK",        144);
		defineConst("SCROLL_LOCK",     145);
		defineConst("SEMI_COLON",      186);
		defineConst("EQUALS",          187);
		defineConst("COMMA",           188);
		defineConst("DASH",            189);
		defineConst("PERIOD",          190);
		defineConst("FORWARD_SLASH",   191);
		defineConst("TILDE",           192);
		defineConst("OPEN_BRACKET",    219);
		defineConst("BACK_SLASH",      220);
		defineConst("CLOSE_BRACKET",   221);
		defineConst("SINGLE_QUOTE",    222);

		return ButtonCode;
	}());

	Capsule.Math = (function() {
		var CapsuleMath = Object.create(Math);

		var defineConst = function(key, value) {
			Object.defineProperty(CapsuleMath, key, {
				value: value,
				enumerable: true
			});
		};

		defineConst("TAU",     Math.PI * 2);
		defineConst("HALF_PI", Math.PI / 2);

		defineConst("ANGLE_RIGHT", CapsuleMath.TAU * 0.00);
		defineConst("ANGLE_DOWN",  CapsuleMath.TAU * 0.25);
		defineConst("ANGLE_LEFT",  CapsuleMath.TAU * 0.50);
		defineConst("ANGLE_UP",    CapsuleMath.TAU * 0.75);

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
			Object.defineProperties(this, {
				x: {
					value: x || 0,
					configurable: false,
					writable: true,
					enumerable: true
				},
				y: {
					value: y || 0,
					configurable: false,
					writable: true,
					enumerable: true
				}
			});
		};

		var defineProperty = function(key, accessor) {
			Object.defineProperty(Vector.prototype, key, {
				enumerable: true,
				get: accessor.get,
				set: accessor.set
			});
		};

		Vector.getDistanceBetween2 = function(vector1, vector2) {
			var x = vector1.x - vector2.x;
			var y = vector1.y - vector2.y;

			return (x * x) + (y * y);
		};

		Vector.getDistanceBetween = function(vector1, vector2) {
			return Math.sqrt(Vector.getDistanceBetween(vector1, vector2));
		};

		defineProperty("length2", {
			get: function() {
				return (this.x * this.x) + (this.y * this.y);
			}
		});

		defineProperty("length", {
			get: function() {
				return Math.sqrt(this.length2);
			},
			set: function(value) {
				this.setPolar(null, value);
			}
		});

		defineProperty("angle", {
			get: function() {
				return Math.atan2(this.y, this.x);
			},
			set: function(value) {
				return this.setPolar(value, null);
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
			Object.defineProperties(this, {
				width: {
					value: width || 0,
					configurable: false,
					writable: true,
					enumerable: true
				},
				height: {
					value: height || 0,
					configurable: false,
					writable: true,
					enumerable: true
				}
			});
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

	Capsule.Timer = (function() {
		var Timer = function(max) {
			Object.defineProperties(this, {
				_total: {
					value: 0,
					configurable: false,
					writable: true,
					enumerable: false
				},
				_elapsed: {
					value: 0,
					configurable: false,
					writable: true,
					enumerable: false
				},
				_lastUpdate: {
					value: 0,
					configurable: false,
					writable: true,
					enumerable: false
				},
				MAX_LATENCY: {
					value: max || 100,
					configurable: false,
					writable: false,
					enumerable: true
				}
			});
		};

		Timer.prototype.start = function() {
			this._lastUpdate = Date.now();

			return this;
		};

		Timer.prototype.update = function() {
			this._total += this._elapsed;
			var now = Date.now();
			var elapsed = now - this._lastUpdate;
			this._elapsed = elapsed > this.MAX_LATENCY ? this.MAX_LATENCY : elapsed;
			this._lastUpdate = now;

			return this;
		};

		var defineProperty = function(key, accessor) {
			Object.defineProperty(Timer.prototype, key, {
				get: accessor.get,
				set: accessor.set,
				enumerable: true
			});
		};

		defineProperty("elapsed", {
			get: function() {
				return this._elapsed;
			}
		});

		defineProperty("total", {
			get: function() {
				return this._total;
			}
		});

		return Timer;
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
			document.addEventListener("keydown", keyDownHandler);
			document.addEventListener("keyup", keyUpHandler);
			document.addEventListener("mousemove", mousemoveHandler);
			document.addEventListener("mousedown", keyDownHandler);
			document.addEventListener("mouseup", keyUpHandler);
			document.addEventListener("contextmenu", contextmenuHandler);

			document.getElementById(Capsule.Config.ID_FULLSCREEN).addEventListener("click", function() {
				var canvas = document.getElementById(Capsule.Config.ID_CANVAS);

				if (canvas.requestFullscreen) {
					canvas.requestFullscreen();
				} else if (canvas.msRequestFullscreen) {
					canvas.msRequestFullscreen();
				} else if (canvas.mozRequestFullScreen) {
					canvas.mozRequestFullScreen();
				} else if (canvas.webkitRequestFullscreen) {
					canvas.webkitRequestFullscreen();
				}
			});
		});

		return {
			isKeyPressed: function(keyCode) {
				return keyState[keyCode];
			},
			getMousePosition: function(relativeElement) {
				var position = mousePosition.clone();

				if (relativeElement) {
					position.x -= relativeElement.offsetLeft;
					position.y -= relativeElement.offsetTop;
				}

				return position;
			}
		};
	}());

	Capsule.Stack = (function() {
		var Stack = function() {
			Object.defineProperties(Stack, {
				_items: {
					value: [],
					writable: true,
					enumerable: false
				}
			});
		};

		var defineProperty = function(key, accessor) {
			Object.defineProperty(Stack.prototype, key, {
				enumerable: true,
				get: accessor.get,
				set: accessor.set
			});
		};

		defineProperty("count", {
			get: function() {
				return this._items.length;
			}
		});

		defineProperty("top", {
			get: function() {
				var items = this._items;

				return items[items.length - 1];
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

	return Capsule;
}());
