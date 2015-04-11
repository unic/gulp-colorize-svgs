var gulp = require('gulp'),
	fs = require('fs'),
	path = require('path'),
	es = require('event-stream'),
	assert = require('assert'),
	colorize = require('../index.js');

describe('gulp-colorize-svgs', function() {
	it('create red and blue variant of icon and green variant of icon2', function(done) {
		gulp.src(__dirname + '/fixtures/*.svg')
			.pipe(colorize({
				colors: {
					default: {
						blue: "0000ff",
						red: "ff0000"
					},
					icon2: {
						green: "00ff00"
					}
				},
				replaceColor: function(content, hex) {
					return content.replace(/fill="#(.*?)"/g, 'fill="#' + hex + '"');
				},
				replacePath: function(path, colorKey) {
					return path.replace(/\.svg/, '--' + colorKey + '.svg');
				}
			}))
			.pipe(gulp.dest(__dirname + '/results/'))
			.pipe(es.wait(function() {
				assert.equal(
					fs.readFileSync(__dirname + '/results/icon--blue.svg', 'utf8'),
					fs.readFileSync(__dirname + '/expected/icon--blue.svg', 'utf8')
				);
				assert.equal(
					fs.readFileSync(__dirname + '/results/icon--red.svg', 'utf8'),
					fs.readFileSync(__dirname + '/expected/icon--red.svg', 'utf8')
				);
				assert.equal(
					fs.readFileSync(__dirname + '/results/icon2--green.svg', 'utf8'),
					fs.readFileSync(__dirname + '/expected/icon2--green.svg', 'utf8')
				);

				fs.unlinkSync(__dirname + '/results/icon--blue.svg');
				fs.unlinkSync(__dirname + '/results/icon--red.svg');
				fs.unlinkSync(__dirname + '/results/icon2--green.svg');
				fs.rmdirSync(__dirname + '/results/');

				done();
			}));
	});
});
