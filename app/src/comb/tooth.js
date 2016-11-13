import Oscillator from './oscillator';

const vibrationDecay = 500;

class Tooth {
	constructor(options, offsetX, note) {
		this.note = note;
		this.oscillator = new Oscillator(options);

		this.width = options.tooth.width;
		this.length = options.tooth.length;

		this.offset = this.width / 2;
		this.offsetX = offsetX;

		this.x = this.offsetX;
		this.z = 0;
	}

	display(processing) {
		processing.pushMatrix();

		// Center the shape
		processing.translate(-this.offset + this.offsetX, 0);

		this.x = this.oscillator.run(1);
		this.displayTooth(processing);

		processing.popMatrix();
	}

	displayTooth(processing) {
		let absZ = Math.abs(this.z) / 5;
		let y1 = this.length / 4 + absZ;
		let y2 = this.length / 1.5 + absZ;
		let y3 = this.length + absZ;

		processing.beginShape();
		processing.vertex(0, 0);
		processing.bezierVertex(0, y1, 0, y2, 0 - this.x - absZ, y3);
		processing.vertex(this.width - this.x + absZ, y3);
		processing.bezierVertex(this.width, y2, this.width, y1, this.width, 0);
		processing.vertex(0, 0);
		processing.endShape();
	}

	triggerAnimation() {
		this.twisted = true;

		var interval = window.setInterval(() => {
			this.z += 0.1;
		}, 10);

		window.setTimeout(() => {
			this.oscillator.triggerVibration();
			this.twisted = false;
			this.z = 0;
			window.clearInterval(interval);
		}, vibrationDecay);
	}
}

export default Tooth;