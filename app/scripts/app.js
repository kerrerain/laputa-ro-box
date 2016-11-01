(function() {
	'use strict';
	
	var Box = require('./box/');
	var canvas = document.getElementById("mainCanvas");

	new Processing(canvas, new Box({
		scale: 1.5
	}).draw);

	// var canvasTest = document.getElementById("testCanvas");

	// var test = require('./test/test')();
	// new P(canvasTest, test.draw)

})();