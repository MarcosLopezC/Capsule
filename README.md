Capsule Framework
=================

Capsule is 2D game development framework written in JavaScript.

## Building Instructions

This project uses [node](http://nodejs.org/), [Grunt](http://gruntjs.com/), and [JSBuilder](https://github.com/MarcosLopezC/JSBuilder).

1. [Install node](http://nodejs.org/).
2. [Install Grunt CLI](http://gruntjs.com/getting-started) by running: `npm install -g grunt-cli`.
3. [Download](https://github.com/MarcosLopezC/JSBuilder) and build JSBuilder.
4. Navigate to the capsule's root directory and run `npm install` to install the project dependencies.
5. Open `Gruntfile.js` and change `var jsBuilderPath = "jsb";` to point to the path of JSBuilder.
6. Run `grunt` to build. A `capsule.js` file will be generated in the _Build_ directory.
