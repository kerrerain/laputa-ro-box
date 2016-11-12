export default (tooth, soundPlayer) => {
	return processing => {
		processing.setup = () => {
			processing.size(400, 400);
		};

		processing.draw = () => {
			tooth.display(processing);
			soundPlayer.gain.gain.value = tooth.gain;
		};

		processing.mousePressed = function() {
			tooth.originMouseX = processing.mouseX;
			tooth.originMouseZ = processing.mouseY;
		};

		processing.mouseReleased = function() {
			tooth.originMouseX = 0;
			tooth.originMouseZ = 0;
			tooth.twistX = tooth.twistZ;
			tooth.twistZ = 0;
		};

		processing.mouseDragged = function() {
			tooth.twistZ = (processing.mouseY - tooth.originMouseZ) / 15;
			tooth.velocity = 0;
			tooth.acceleration = 0;
		};
	};
};