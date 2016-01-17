/*global location*/

'use strict';

(function() {
	
	var config = {
		url: "https://blog.thiago.me/raspberry-pi-bare-metal-programming-with-rust/",
    both: true,
		dark: false,
		loadMore: true,
		infiniteScroll: false,
    service: "hn",
    limit: 5
	};

	function extend(o1, o2) {
		var result={};
		
		for(var key in o1) result[key]=o1[key];
		for(var key2 in o2) result[key2]=o2[key2];
		
		return result;
	};

	function getQueryObj() {
		if(location.search === "") {
			return {};
		}
		
	  return location.search.replace(/(^\?)/,'').split("&").map(function(n){
			return n = n.split("="),this[n[0]] = decodeURIComponent(n[1]),this;
		}.bind({}))[0];
	};

	function createScript(opts) {
		var container = document.querySelector('.try-it-container');
		var script = document.createElement('script');
		script.src = "/embedd.min.js";
		script.innerHTML = JSON.stringify(opts);
		container.appendChild(script);
	};

	function renderEmbedd() {
		var form = document.querySelector('form');
		var qs = getQueryObj();

		if(qs.limit) {
			qs.limit = Number(qs.limit);
		}
		
		var opts = extend(config, qs);

		for(var key in opts) {
			if(opts.hasOwnProperty(key)) {
				if(opts[key] === "true") {
					opts[key] = true;
				}
				if(opts[key] === "false") {
					opts[key] = false;
				}

				form[key].value = opts[key];
			}
		};

		opts.debug = true;

		createScript(opts);
	};

	renderEmbedd();

})();
