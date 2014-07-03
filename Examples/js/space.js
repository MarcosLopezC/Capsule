// Space for Capsule Framework.

// Aliases
var Rectangle = capsule.Rectangle;
var Size      = capsule.Size;
var Color     = capsule.Color;
var game      = capsule.game;
var constrain = capsule.math.constrain;
var isPressed = capsule.input.isButtonPressed;
var code      = capsule.buttonCode;
var Sprite    = capsule.Sprite;

// Craft class
var Craft = function() {
	this.box = new Rectangle();

	this.box.size = new Size(30, 40);
	this.box.style.strokeThickness = 0;
	this.box.style.fillColor = new Color(250, 230, 230);
	this.box.position.y = 540;
};

Craft.prototype.update = function(elapsed, total) {
	if (isPressed(code.ARROW_LEFT)) {
		this.box.position.x -= 0.4 * elapsed;
	}

	if (isPressed(code.ARROW_RIGHT)) {
		this.box.position.x += 0.4 * elapsed;
	}

	this.box.position.x = constrain(this.box.position.x, 20, 760);
};

Craft.prototype.draw = function(context) {
	this.box.draw(context);
};

// Enemy class
var Enemy = function(position, color) {
	this.box = new Rectangle();

	this.box.size = new Size(30, 30);
	this.box.style.strokeThickness = 0;
	this.box.position = position || new Vector();
	this.box.style.fillColor = color || new Color(230, 100, 120);

};

Enemy.prototype.update = function(elapsed, total) {

};

Enemy.prototype.draw = function(context) {
	this.box.draw(context);
};

// Game objects.
var background = new Sprite("img/space.png");
var player     = new Craft();

// Setting up the game.
game.onStart = function(game) {
	
};

// Draw the state of the game.
game.onUpdate = function(elapsed, total) {
	player.update(elapsed, total);
};

// Update the state of the game.
game.onDraw = function(context) {
	background.draw(context);
	player.draw(context);
}

game.run();
