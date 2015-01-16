(function() {
	QUnit.module("capsule");

	QUnit.test("capsule", function(assert) {
		assert.equal(typeof capsule, "object", "capsule object is defined.");
	});
}());

(function() {
	QUnit.module("capsule.math");

	QUnit.test("Checking if it's defined", function(assert) {
		assert.equal(typeof capsule.math, "object", "capsule.math object is defined.");
	});

	QUnit.test("modulus", function(assert) {
		var modulus = capsule.math.modulus;

		assert.equal(modulus(10, 20),  10);
		assert.equal(modulus(10,  5),   0);
		assert.equal(modulus(5 ,  2),   1);
		assert.equal(modulus(-5,  2),   1);
		assert.equal(modulus(0 , 10),   0);

		assert.equal(isNaN(modulus(5, 0)), true);
	});

	QUnit.test("randomAngle", function(assert) {
		var i;
		var value;
		var randomAngle = capsule.math.randomAngle;

		for (i = 0; i < 100; i += 1) {
			value = randomAngle();
			assert.ok(value > 0 && value < 360, value + " is in the expected range.");
		}
	});

	QUnit.test("randomNumber", function(assert) {
		var i;
		var value;
		var randomNumber = capsule.math.randomNumber;
		var isBetween    = capsule.math.isBetween;

		for (i = 0; i < 100; i += 1) {
			value = randomNumber(0, i);
			assert.ok(isBetween(value, 0, i),
				value + " is in the expected range. Min: 0, Max: " + i);
			value = randomNumber(50 - i, i);
			assert.ok(isBetween(value, 50 - i, i),
				value + "is in the expected range. Min: " + (50 - i) + ", Max: " + i);
			value = randomNumber(-i, 0);
			assert.ok(isBetween(value, -i, 0),
				value + " is in the expected range. Min: " + -i + ", Max: 0");
		}
	});

	QUnit.test("randomInteger", function(assert) {
		var i;
		var value;
		var randomInteger = capsule.math.randomInteger;
		var isBetween     = capsule.math.isBetween;

		for (i = 0; i < 100; i += 1) {
			value = randomInteger(0, i);
			assert.equal(value, Math.floor(value), value + " is an integer.");
			assert.ok(isBetween(value, 0, i), value + " is in the expected range. Min: 0, Max: " + i);
			value = randomInteger(-i, 0);
			assert.ok(isBetween(value, -i, 0), value + " is in the expected range. Min: " + (-i) + " Max: 0");
		}
	});

	QUnit.test("constrain", function(assert) {
		var constrain = capsule.math.constrain;
		assert.equal(constrain( 50, 0, 100),  50);
		assert.equal(constrain(-50, 0, 100),   0);
		assert.equal(constrain(200, 0, 100), 100);
	});

	QUnit.test("isBetween", function(assert) {
		var isBetween = capsule.math.isBetween;
		assert.equal(isBetween( 50, 0, 100),  true);
		assert.equal(isBetween(-50, 0, 100), false);
		assert.equal(isBetween(200, 0, 100), false);
		assert.equal(isBetween(  0, 0, 100),  true);
		assert.equal(isBetween(100, 0, 100),  true);
	});

	QUnit.test("normalize", function(assert) {
		var normalize = capsule.math.normalize;
		assert.equal(normalize( 50, 0, 100),  0.50);
		assert.equal(normalize( 25, 0, 100),  0.25);
		assert.equal(normalize( 10, 0, 100),  0.10);
		assert.equal(normalize(-10, 0, 100), -0.10);
		assert.equal(normalize(-50, 0, 100), -0.50);
		assert.equal(normalize(200, 0, 100),  2.00);
	});

	QUnit.test("linearInterpolation", function(assert) {
		var lerp = capsule.math.linearInterpolation;
		assert.equal(lerp( 0.50,   0, 100),  50);
		assert.equal(lerp( 0.25,   0, 100),  25);
		assert.equal(lerp( 0.10,   0, 100),  10);
		assert.equal(lerp(-0.50,   0, 100), -50);
		assert.equal(lerp( 0.50, 100,   0),  50);
		assert.equal(lerp(-0.50, 100,   0), 150);
		assert.equal(lerp( 2.00,   0, 100), 200);
	});

	QUnit.test("map", function(assert) {
		var map = capsule.math.map;
		assert.equal(map(50,    0, 100,   0, 10), 5.0);
		assert.equal(map(50,    0, 100, -10, 10), 0.0);
		assert.equal(map(50, -100, 100,   0, 10), 7.5);
	});

	QUnit.test("toDegrees", function(assert) {
		var toDegrees = capsule.math.toDegrees;
		var TAU = capsule.math.TAU;
		assert.equal(toDegrees(Math.PI / 2), 90);
		assert.equal(toDegrees(0), 0);
		assert.equal(toDegrees(TAU), 360);
	});

	QUnit.test("toRadians", function(assert) {
		var toRadians = capsule.math.toRadians;
		var TAU = capsule.math.TAU;
		assert.equal(toRadians(90), Math.PI / 2);
		assert.equal(toRadians(0), 0);
		assert.equal(toRadians(360), TAU);
	});

	QUnit.test("Checking constant properties", function(assert) {
		[
			"TAU",
			"HALF_PI"
		].forEach(function(name) {
			var descriptor = Object.getOwnPropertyDescriptor(capsule.math, name);
			assert.equal(descriptor.writable, false, name + " property is read-only.");
		});
	});

	// All trigonometric functions are tested together using a helper function.
	(function() {
		var MAX_ERROR = 1e-4;

		var compare = function(a, b) {
			return Math.abs(a - b) < MAX_ERROR;
		};

		var createTest = function(functionName, assert) {
			var func = capsule.math[functionName];
			assert.ok(typeof func === "function", functionName + " is defined.");
			return function(input, expected) {
				var result = func(input);
				assert.ok(compare(func(input), expected),
					"{func}({input}) = {result} (Expected: {expected}; Diff: {diff})."
					.replace("{func}", functionName)
					.replace("{input}", input)
					.replace("{result}", result)
					.replace("{expected}", expected)
					.replace("{diff}", Math.abs(result - expected))
				);
			};
		};

		QUnit.test("sin", function(assert) {
			var test = createTest("sin", assert);
			test(0, 0);
			test(30, 0.5);
			test(45, 0.707106);
			test(60, 0.866025);
			test(90, 1);
			test(180, 0);
			test(270, -1);
			test(360, 0);
		});

		QUnit.test("cos", function(assert) {
			var test = createTest("cos", assert);
			test(0, 1);
			test(30, 0.866025);
			test(45, 0.707106);
			test(60, 0.5);
			test(90, 0);
			test(180, -1);
			test(270, 0);
			test(360, 1);
		});

		QUnit.test("tan", function(assert) {
			var test = createTest("tan", assert);
			test(0, 0);
			test(30, 0.577350);
			test(45, 1);
			test(60, 1.732050);
			test(180, 0);
		});

		QUnit.test("arcSin", function(assert) {
			var test = createTest("arcSin", assert);
			test(0, 0);
			test(0.5, 30);
			test(0.707106, 45);
			test(0.866025, 60);
			test(1, 90);
			test(-1, -90);
		});

		QUnit.test("arcCos", function(assert) {
			var test = createTest("arcCos", assert);
			test(1, 0);
			test(0.866025, 30);
			test(0.707106, 45);
			test(0.5, 60);
			test(0, 90);
			test(-1, 180);
		});

		QUnit.test("arcTan", function(assert) {
			var test = createTest("arcTan", assert);
			test(0, 0);
			test(0.577350, 30);
			test(1, 45);
			test(1.732050, 60);
		});
	}());

	QUnit.test("min", function(assert) {
		var min = capsule.math.min;
		assert.equal(min(10, 20, 30), 10, "10 is min.");
		assert.equal(min(-50, 0, 50), -50, "-50 is min.");
		assert.equal(min(30, 10, 20), 10, "10 is min.");
	});

	QUnit.test("max", function(assert) {
		var max = capsule.math.max;
		assert.equal(max(10, 20, 30), 30, "30 is max.");
		assert.equal(max(-50, 0, 50), 50, "50 is max.");
		assert.equal(max(30, 10, 20), 30, "30 is max.");
	});
}());

(function() {
	QUnit.module("capsule.List");

	var createSampleList = function() {
		var list = new capsule.List();
		for (var i = 0; i <= 10; i += 1) {
			list.add(i);
		}
		return list;
	};

	QUnit.test("Checking if List is defined", function(assert) {
		assert.equal(typeof capsule.List, "function", "List is defined.");
	});

	QUnit.test("General functionality test", function(assert) {
		var list = createSampleList();
		assert.equal(list.first, 0, "list.first is 0.");
		list.add(11);
		assert.equal(list.count, 12, "list.count is 12.");
		list.add(13);
		assert.equal(list.count, 13, "list.count is 13.");
		assert.equal(list.last, 13, "list.last is 13.");
		list.insert(12, 12);
		assert.equal(list.count, 14, "list.count is 14.");
		assert.equal(list.getItemAt(5), 5, "list.getItemAt(5) is 5.");
		list.remove(13);
		assert.equal(list.count, 13, "list.count is 13.");
		list.remove(20);
		assert.equal(list.count, 13, "list.count is 13.");
		list.reverse();
		assert.equal(list.getItemAt(2), 10, "list.getItemAt(2) is 10.");
		var sum = 0;
		list.forEach(function(i) {
			sum += i;
		});
		assert.equal(sum, 78, "Sum of all the items in the list is 78.");
		list.insert(13).insert(15).insert(14);
		list.sort(function(a, b) {
			return a - b;
		});
		assert.equal(list.first, 0, "list.first is 0.");
		assert.equal(list.last, 15, "list.last is 15.");
		var copy = list.clone();
		list.removeAt(0);
		assert.equal(list.first, 1, "list.first is 1.");
		list.clear();
		assert.equal(list.count, 0, "list.count is 0.");
		assert.equal(copy.count, 16, "list.count is 16.");
	});
}());

(function() {
	QUnit.module("capsule.Queue");

	QUnit.test("Checking if Queue is defined", function(assert) {
		assert.equal(typeof capsule.Queue, "function", "Queue is defined.");
	});

	QUnit.test("General functionality test", function(assert) {
		var queue = new capsule.Queue();
		assert.equal(queue.count, 0, "queue.count is 0.");
		assert.equal(queue.peek(), undefined, "queue.peek() is undefined.");
		assert.equal(queue.pop(), undefined, "queue.pop() is undefined.");
		queue.push(0).push(1).push(2);
		assert.equal(queue.count, 3, "queue.count is 3.");
		assert.equal(queue.peek(), 0, "queue.peek() is 0");
		assert.equal(queue.pop(), 0, "queue.pop() is 0");
		assert.equal(queue.count, 2, "queue.count is 2.");
		assert.equal(queue.getItemAt(1), 2, "queue.getItemAt(1) is 2.");
		var sum = 0;
		queue.forEach(function(i) {
			sum += i;
		});
		assert.equal(sum, 3, "the sum of all items in the queue is 3.");
		var copy = queue.clone();
		queue.clear();
		assert.equal(queue.count, 0, "queue.count is 0.");
		assert.equal(copy.count, 2, "copy.count is 2");
	});
}());

(function() {
	QUnit.module("capsule.Stack");

	QUnit.test("Checking if Stack is defined", function(assert) {
		assert.equal(typeof capsule.Stack, "function", "Stack is defined.");
	});

	QUnit.test("General functionality test", function(assert) {
		var stack = new capsule.Stack();
		assert.equal(stack.count, 0, "stack.count is 0.");
		assert.equal(stack.peek(), undefined, "stack.peek() is undefined.");
		assert.equal(stack.pop(), undefined, "stack.pop() is undefined.");
		stack.push(0).push(1).push(2);
		assert.equal(stack.count, 3, "stack.count is 3.");
		var sum = 0;
		stack.forEach(function(i) {
			sum += i;
		});
		assert.equal(sum, 3, "The sum of all the items in the stack is 3.");
		assert.equal(stack.peek(), 2, "stack.peek() is 2.");
		assert.equal(stack.pop(), 2, "stack.pop() is 2.");
		assert.equal(stack.count, 2, "stack.count is 2.");
		assert.equal(stack.getItemAt(1), 1, "stack,getItemAt(1) is 1.");
		var copy = stack.clone();
		stack.clear();
		assert.equal(stack.count, 0, "stack.count is 0.");
		assert.equal(copy.count, 2, "copy.count is 2.");
	});
}());
