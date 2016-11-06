(function() {
	'use strict';

	var Cylinder = require('./cylinder');
	var Comb = require('./comb');

	function Mechanism(options) {
		this.options = options;
		this.cylinder = new Cylinder();
		this.comb = new Comb(options);
	}

	Mechanism.prototype.display = function(processing) {
		this.cylinder.display(processing);
		this.comb.display(processing);
	};

	module.exports = Mechanism;
})();