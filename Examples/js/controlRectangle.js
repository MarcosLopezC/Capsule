// Create a rectangle.
var rectangle = new capsule.Rectangle();

// Setting the rectangle size to 50x50.
rectangle.size = new capsule.Size(50, 50);

// Setting rectangle color to gray.
rectangle.style.fillColor = new capsule.Color(127, 127, 127);

// Creating a background rectangle to clear the canvas.
var background = new capsule.Rectangle();
background.size = new capsule.Size(800, 600);
background.style.strokeThickness = 0;

// Define the draw event handler.
capsule.game.onDraw = function(context) {
	// Draw background.
	background.draw(context);
	// Draw the rectangle.
	rectangle.draw(context);
};

// Define the update event handler.
capsule.game.onUpdate = function(elapsed, total) {
	// Creating aliases.
	var isPressed = capsule.input.isButtonPressed;
	var code      = capsule.buttonCode;
	var position  = rectangle.position;
	var canvas    = capsule.game.context.canvas;
	var constrain = capsule.math.constrain;

	// Move rectangle.
	if (isPressed(code.ARROW_UP)) {
		position.y -= 10;
	}
	if (isPressed(code.ARROW_DOWN)) {
		position.y += 10;
	}
	if (isPressed(code.ARROW_LEFT)) {
		position.x -= 10;
	}
	if (isPressed(code.ARROW_RIGHT)) {
		position.x += 10;
	}

	// Constrain position.
	position.x = constrain(position.x, 0, 800 - rectangle.size.width);
	position.y = constrain(position.y, 0, 600 - rectangle.size.height);
};

capsule.game.run();
