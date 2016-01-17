/*global require,module*/

'use strict';

var fs = require('fs'),
		sass = require('node-sass'),
		bourbon = require('node-bourbon'),
		neat = require('node-neat');

function render() {
	sass.render({
		file: './scss/main.scss',
		includePaths: bourbon.with(neat.includePaths),
		outputStyle: 'compressed'
	}, (err, result) => {
		if(err) { throw err; }

		fs.writeFile('./build/main.css', result.css, err =>{
			if(err) { throw err; }

			console.log('wrote main.css');
		});
	});
};

module.exports = render;
