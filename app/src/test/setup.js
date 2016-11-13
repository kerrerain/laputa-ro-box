export default (tooth, synthesizer) => {
	return processing => {
		processing.setup = () => {
			processing.size(400, 400);
		};

		processing.draw = () => {
			tooth.display(processing);
		};

		processing.mousePressed = () => {
			tooth.mousePressed(processing);
		};

		processing.mouseReleased = () => {
			tooth.mouseReleased(processing);
			synthesizer.triggerNote('C4', 1.5);
		};

		processing.mouseDragged = () => {
			tooth.mouseDragged(processing);
		};
	};
};