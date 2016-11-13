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
			synthesizer.playNote('C4', 1.5, 0);
		};

		processing.mouseDragged = () => {
			tooth.mouseDragged(processing);
		};
	};
};