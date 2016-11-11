/**
 * Handles the initialization of the Processing.js canvas.
 */
export default (options, body, mechanism) => {
	return processing => {
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
};