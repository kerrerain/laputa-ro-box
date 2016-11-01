(function() {
	'use strict';

	var Body = require('./body');
	var setup = require('./setup');
	var _ = require('lodash');

	module.exports = Box;

	function Box(customOptions) {
		var self = this;

		var options = {
			scale: 1,
			width: 400,
			height: 200,
			backgroundColor: 200
		};

		_.assign(options, customOptions);

		self.draw = setup(options, new Body());
	}
})();