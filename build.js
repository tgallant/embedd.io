/* global require,process,__dirname */

'use strict'

const metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const permalinks = require('metalsmith-permalinks')
const assets = require('metalsmith-assets')
const postcss = require('metalsmith-postcss')

const meta = {
  title: 'embedd.io | the best option for embedding reddit and hacker news comments',
  description: 'Embedd allows you to show off your Reddit and HackerNews comments right on your blog or product page. The painless setup makes it easy to get started right away',
  keywords: 'reddit hackernews hacker news hn embedd js javascript blog wordpress landing page'
}

const layoutConfig = {
  engine: 'handlebars',
  partials: 'partials'
}

const assetsConfig = {
  source: './assets',
  destination: './'
}

const postCssConfig = {
  plugins: {
    'postcss-cssnext': {},
    'postcss-simple-vars': {},
    'css-mqpacker': {},
    'postcss-neat': {},
    'postcss-normalize': {},
    'postcss-csso': {}
  }
}

function handleError (err) {
  if (err) { throw err }
}

metalsmith(__dirname)
  .metadata(meta)
  .use(markdown())
  .use(layouts(layoutConfig))
  .use(permalinks('posts/:title'))
  .use(assets(assetsConfig))
  .use(postcss(postCssConfig))
  .build(handleError)
