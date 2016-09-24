/* global location */

(function () {
  function extend (o1, o2) {
    var result = {}

    for (var key in o1) { result[key] = o1[key] }
    for (var key2 in o2) { result[key2] = o2[key2] }

    return result
  }

  function getQueryObj () {
    if (location.search === '') {
      return {}
    }

    return location.search.replace(/(^\?)/, '').split('&').map(function (n) {
      n = n.split('=')
      this[n[0]] = decodeURIComponent(n[1])
      return this
    }.bind({}))[0]
  }

  function createScript (opts) {
    var container = document.querySelector('.try-it-container')
    var script = document.createElement('script')
    script.src = 'https://embedd.io/embedd.min.js'
    script.innerHTML = JSON.stringify(opts)
    container.appendChild(script)
  }

  function fillTemplate (opts) {
    var configBlock = document.querySelector('[data-config-block]')
    var scriptStart = '&lt;script src="https://embedd.io/embedd.min.js"&gt;'
    var scriptEnd = '&lt;/script&gt;'

    var config = extend({}, opts)

    if (config.url === '') { delete config.url }
    if (config.dark === false) { delete config.dark }
    if (config.both === true) { delete config.both }
    if (config.service === 'reddit') { delete config.service }
    if (config.limit === 5) { delete config.limit }
    if (config.loadMore === true) { delete config.loadMore }
    if (config.infiniteScroll === false) { delete config.infiniteScroll }
    if (config.debug === false) { delete config.debug }

    if (Object.keys(config).length < 1) {
      config = ''
    } else {
      config = '\n' + JSON.stringify(config, null, '\t') + '\n'
    }

    var configStr = scriptStart + config + scriptEnd

    configBlock.innerHTML = configStr
  }

  function renderEmbedd () {
    var config = {
      url: 'https://blog.thiago.me/raspberry-pi-bare-metal-programming-with-rust/',
      both: true,
      dark: false,
      loadMore: true,
      infiniteScroll: false,
      service: 'hn',
      limit: 5
    }

    var form = document.querySelector('form')
    var qs = getQueryObj()

    if (qs.limit) {
      qs.limit = Number(qs.limit)
    }

    var opts = extend(config, qs)

    for (var key in opts) {
      if (opts.hasOwnProperty(key)) {
        if (opts[key] === 'true') {
          opts[key] = true
        }
        if (opts[key] === 'false') {
          opts[key] = false
        }

        form[key].value = opts[key]
      }
    }

    createScript(opts)
    fillTemplate(opts)
  }

  renderEmbedd()
})()
