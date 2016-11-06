(function() {
	'use strict';

	var Body = require('./body');
	var Mechanism = require('./mechanism/');
	var setup = require('./setup');
	var _ = require('lodash');

	var options = {
		scale: 1,
		width: 400,
		height: 200,
		backgroundColor: 200,
		notes: 16,
		tooth: {
			width: 4,
			length: 55
		}
	};

	function Box(customOptions) {
		var self = this;

		_.assign(options, customOptions);

		self.draw = setup(options, new Body(), new Mechanism(options));
	}

	module.exports = Box;
})();