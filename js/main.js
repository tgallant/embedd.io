'use strict';

(function() {
	var lastScroll = window.pageYOffset || document.body.scrollTop;
	var header = document.querySelector('header');
	
	function addFixedNav() {
		if(!header.classList.contains('fixed')) {
			header.classList.add('fixed');
		}
	};

	function removeFixedNav() {
		if(header.classList.contains('fixed')) {
			header.classList.remove('fixed');
		}
	};

	window.addEventListener('scroll', function() {
		var currentScroll = window.pageYOffset || document.body.scrollTop;
		var throttled = Math.abs(currentScroll - lastScroll) > 20;
		
		if(currentScroll > lastScroll && throttled) {
			removeFixedNav();
		}

		if(currentScroll < lastScroll && throttled) {
			addFixedNav();
		}

		lastScroll = currentScroll;
		
	});
	
})();
