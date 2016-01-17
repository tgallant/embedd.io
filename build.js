/*global require,process,__dirname*/

'use strict';

let metalsmith = require('metalsmith'),
		markdown = require('metalsmith-markdown'),
		layouts = require('metalsmith-layouts'),
		permalinks = require('metalsmith-permalinks'),
		assets = require('metalsmith-assets'),
		scss = require('./plugins/scss');

const meta = {
	title: "embedd.io"
};

function build() {
	metalsmith(__dirname)
		.metadata(meta)
		.use(markdown())
		.use(layouts('handlebars'))
		.use(permalinks('posts/:title'))
		.use(assets({
			source: './js',
			destination: './'
		}))
		.build(err => {
			if(err) { throw err; }
			scss();
		});
}

build();

if(process.argv.indexOf('-w') > -1) {
	let http = require('http'),
			serveStatic = require('serve-static'),
			finalhandler = require('finalhandler');

	let serve = serveStatic("./build");

	let server = http.createServer(function(req, res) {
		let done = finalhandler(req, res);
		serve(req, res, done);
	});

	server.listen(8000);
}
