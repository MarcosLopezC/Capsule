// Pong for Capsule Framework.

// Aliases
var button    = capsule.buttonCode;
var isPressed = capsule.input.isButtonPressed;
var isBetween = capsule.math.isBetween;
var constrain = capsule.math.constrain;

// Game objects.
var canvas     = null;
var background = new capsule.Rectangle();
var ball       = new capsule.Rectangle();
var player     = new capsule.Rectangle();
var computer   = new capsule.Rectangle();

// Setting up the game.
capsule.game.onStart = function(game) {
	// The space between rackets and the edges.
	var spacing = 20;

	canvas = game.context.canvas;

	background.size.width  = canvas.width;
	background.size.height = canvas.height;

	background.style.strokeThickness = 0;
	background.style.fillColor = new capsule.Color(255, 255, 255, 1);

	ball.size     = new capsule.Size(20, 20);
	ball.position = new capsule.Vector(10, 10);
	ball.velocity = new capsule.Vector(0.2, 0.2);

	ball.style.fillColor = new capsule.Color(100, 200, 100);

	player.size     = new capsule.Size(20, 100);
	player.position = new capsule.Vector(spacing, 0);

	player.style.fillColor = new capsule.Color(200, 100, 200);

	computer.size     = player.size;
	computer.position = new capsule.Vector(canvas.width - computer.size.width - spacing, 0);

	computer.style.fillColor = new capsule.Color(200, 50, 0);
};

// Draw the state of the game.
capsule.game.onDraw = function(context) {
	background.draw(context);
	ball.draw(context);
	player.draw(context);
	computer.draw(context);
};

// Update the state of the game.
capsule.game.onUpdate = function(elapsed, total) {
	ball.position.add(ball.velocity.clone().scale(elapsed));

	// Check for collisions with player and computer rackets.
	if (ball.collidesWith(player)) {
		ball.position.x = player.position.x + player.size.width;
		ball.velocity.x *= -1;
	}
	if (ball.collidesWith(computer)) {
		ball.position.x = computer.position.x - ball.size.width;
		ball.velocity.x *= -1;
	}

	// Check for collision on the left and right edge.
	if (!isBetween(ball.position.x, 0, canvas.width - ball.size.width)) {
		ball.position.x = canvas.width / 2;
		ball.position.y = canvas.height / 2;
		ball.velocity.x *= -1;
	}

	// Check for collision on the top and bottom edge.
	if (!isBetween(ball.position.y, 0, canvas.height - ball.size.height)) {
		ball.position.subtract(ball.velocity.clone().scale(elapsed));
		ball.velocity.y *= -1;
	}

	// Check for key input.
	if (isPressed(button.ARROW_UP)) {
		player.position.y -= 1 * elapsed;
	}
	if (isPressed(button.ARROW_DOWN)) {
		player.position.y += 1 * elapsed;
	}

	// Constrain the position of the player.
	player.position.y = constrain(player.position.y, 20, (canvas.height - player.size.height) - 20);

	// Compute what the computer should do.
	if (ball.velocity.x > 0) {
		if (ball.position.y < computer.position.y) {
			computer.position.y -= 0.5 * elapsed;
		}
		if (ball.position.y + ball.size.height > computer.position.y + computer.size.height) {
			computer.position.y += 0.5 * elapsed;
		}
	}

	// Constrain the position of the computer.
	computer.position.y = constrain(computer.position.y, 20, (canvas.height - player.size.height) - 20);
};

// Run the game.
capsule.game.run();
