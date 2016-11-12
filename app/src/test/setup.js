export default (tooth, soundPlayer) => {
	return processing => {
		processing.setup = () => {
			processing.size(400, 400);
			//processing.frameRate(4);
		};

		processing.draw = () => {
			tooth.display(processing);
			soundPlayer.destination.gain.value = tooth.gain;
		};

		processing.mousePressed = () => {
			tooth.mousePressed(processing);
		};

		processing.mouseReleased = () => {
			tooth.mouseReleased(processing);
		};

		processing.mouseDragged = () => {
			tooth.mouseDragged(processing);
		};
	};
};