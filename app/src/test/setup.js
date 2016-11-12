export default (tooth, synthesizer) => {
	return processing => {
		processing.setup = () => {
			processing.size(400, 400);
			//processing.frameRate(4);
		};

		processing.draw = () => {
			tooth.display(processing);
		};

		processing.mousePressed = () => {
			tooth.mousePressed(processing);
		};

		processing.mouseReleased = () => {
			tooth.mouseReleased(processing);
			synthesizer.triggerNote('G#3', 100);
		};

		processing.mouseDragged = () => {
			tooth.mouseDragged(processing);
		};
	};
};