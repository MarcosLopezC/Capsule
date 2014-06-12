"use strict";

module.exports = function(grunt) {
	grunt.task.loadNpmTasks("grunt-shell");
	grunt.task.loadNpmTasks("grunt-contrib-watch");

	var jsBuilderPath = "jsb";

	var build = function(input, output) {
		return jsBuilderPath + " " + input + " " + output;
	};

	grunt.config.init({
		shell: {
			build: {
				command: build("Sources/main.js", "Build/capsule.js")
			}
		},
		watch: {
			scripts: {
				files: ["Sources/**/*.js"],
				tasks: ["shell:build"]
			},
			options: {
				interrupt: true
			}
		}
	});

	grunt.registerTask("default", ["shell"]);
};
