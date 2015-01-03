"use strict";

module.exports = function(grunt) {
	var fileBanner = "/*! <%= packageInfo.name %> - v<%= packageInfo.version %> */\n";

	grunt.config.init({
		packageInfo: grunt.file.readJSON("package.json"),
		watch: {
			scripts: {
				files: ["Sources/**/*.js"],
				tasks: ["build"]
			},
			options: {
				interrupt: true
			}
		},
		jshint: {
			all: ["Sources/**/*.js"],
			options: {
				browser: true,
				node: true,
				globals: {
					jQuery: true
				}
			}
		},
		qunit: {
			all: ["Tests/*.html"]
		},
		uglify: {
			capsule: {
				files: {
					"Build/capsule.min.js": ["Build/capsule.js"],
				},
				options: {
					banner: fileBanner
				}
			}
		},
		copy: {
			jquery: {
				expand: true,
				flatten: true,
				src: ["node_modules/jquery/dist/jquery.min.js"],
				dest: "Build/"
			},
			qunit: {
				expand: true,
				flatten: true,
				src: ["node_modules/qunitjs/qunit/*"],
				dest: "Tests/qunit"
			}
		},
		browserify: {
			capsule: {
				files: {
					"Build/capsule.js": "Sources/capsule.js"
				}
			},
			options: {
				banner: fileBanner
			}
		}
	});

	grunt.task.loadNpmTasks("grunt-contrib-watch");
	grunt.task.loadNpmTasks("grunt-contrib-jshint");
	grunt.task.loadNpmTasks("grunt-contrib-uglify");
	grunt.task.loadNpmTasks("grunt-contrib-qunit");
	grunt.task.loadNpmTasks("grunt-contrib-copy");
	grunt.task.loadNpmTasks("grunt-browserify");

	grunt.registerTask("copyDependencies", ["copy:jquery", "copy:qunit"]);
	grunt.registerTask("quickBuild", ["browserify"]);
	grunt.registerTask("build", ["quickBuild", "uglify"]);
	grunt.registerTask("test", ["jshint", "qunit"]);
	grunt.registerTask("default", ["copyDependencies", "build", "test"]);
};