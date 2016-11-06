(function() {
	'use strict';

	/**
	 * Handles the initialization of the Processing.js canvas.
	 */
	function setup(options, body, mechanism) {
		return function(processing) {

			processing.setup = function() {
				processing.size(options.width * options.scale,
					options.height * options.scale);
			};

			processing.draw = function() {
				processing.background(options.backgroundColor);
				processing.scale(options.scale);
				//
				processing.pushMatrix();
				// Translate
				processing.translate(options.width / 2, 0);

				body.display(processing);
				mechanism.display(processing);

				processing.popMatrix();
			};
		};
	}

	module.exports = setup;
})();