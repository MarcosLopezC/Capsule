// Creating a rectangle.
var rectangle = new capsule.Rectangle();

// Place the rectangle at (50, 50).
rectangle.position = new capsule.Vector(50, 50);

// Setting the width and height to 100.
rectangle.size = new capsule.Size(100, 100);

// Set rectangle color to gray.
rectangle.style.fillColor = new capsule.Color(127, 127, 127);

// Defining the draw event handler.
capsule.game.onDraw = function(context) {
	// Draw the rectangle.
	rectangle.draw(context);
};

// Run the game.
capsule.game.run();
