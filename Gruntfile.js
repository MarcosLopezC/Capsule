"use strict";

module.exports = function(grunt) {
	grunt.task.loadNpmTasks("grunt-shell");
	grunt.task.loadNpmTasks("grunt-contrib-watch");
	grunt.task.loadNpmTasks("grunt-contrib-jshint");
	grunt.task.loadNpmTasks("grunt-contrib-qunit");
	grunt.task.loadNpmTasks("grunt-contrib-uglify");

	var jsBuilderPath = "jsb";

	var build = function(input, output) {
		return jsBuilderPath + " " + input + " " + output;
	};

	grunt.config.init({
		pkg: grunt.file.readJSON("package.json"),
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
		},
		jshint: {
			files: ["Build/*.js", "!Build/*.min.js"],
		},
		qunit: {
			files: ["Tests/*.html"]
		},
		uglify: {
			build: {
				files: {
					"Build/<%= pkg.name %>.min.js": ["Build/*.js", "!Build/*.min.js"]
				}
			}
		}
	});

	grunt.registerTask("default", ["shell", "jshint", "uglify"]);
};
