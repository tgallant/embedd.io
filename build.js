/*global require,process,__dirname*/

'use strict';

const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const assets = require('metalsmith-assets');
const postcss = require('metalsmith-postcss');

const meta = {
	title : "embedd.io | the best option for embedding reddit and hacker news comments",
	description : "Embedd allows you to show off your Reddit and HackerNews comments right on your blog or product page. The painless setup makes it easy to get started right away",
	keywords : "reddit hackernews hacker news hn embedd js javascript blog wordpress landing page"
};

function build() {
	metalsmith(__dirname)
		.metadata(meta)
		.use(markdown())
		.use(layouts({ engine : 'handlebars', partials : 'partials' }))
		.use(permalinks('posts/:title'))
		.use(assets({
			source: './assets',
			destination: './'
		}))
    .use(postcss({
      plugins : {
        'postcss-cssnext' : {},
        'postcss-simple-vars' : {},
        'css-mqpacker' : {},
        'postcss-neat' : {},
        'postcss-normalize' : {},
        'postcss-csso' : {}
      }
    }))
		.build(err => {
			if(err) { throw err; }
		});
}

build();

if(process.argv.indexOf('-w') > -1) {
	const http = require('http');
	const serveStatic = require('serve-static');
	const finalhandler = require('finalhandler');

	let serve = serveStatic("./build");

	let server = http.createServer(function(req, res) {
		let done = finalhandler(req, res);
		serve(req, res, done);
	});
	server.listen(8000);
  console.log('server started on port 8000');
}
