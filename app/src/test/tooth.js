import Oscillator from './oscillator';

class Tooth {
	constructor() {
		this.oscillator = new Oscillator();

		this.width = 6;
		this.length = 50;
		this.offset = this.width / 2;
		this.x = 0;
		this.z = 0;
		this.vibrating = false;
		this.timeOfVibration = 0;

		this.originMouseX = 0;
		this.originMouseZ = 0;
	}

	display(processing) {
		processing.background(200);
		processing.scale(2);
		processing.pushMatrix();

		processing.translate(200 / 2, 70);
		processing.strokeWeight(1);

		// Center the shape
		processing.translate(-this.offset, 0);

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

	mousePressed(processing) {
		this.originMouseX = processing.mouseX;
		this.originMouseZ = processing.mouseY;
	}

	mouseReleased() {
		this.originMouseX = 0;
		this.originMouseZ = 0;
		this.oscillator.triggerVibration();
		this.z = 0;
	}

	mouseDragged(processing) {
		this.z = (processing.mouseY - this.originMouseZ) / 15;
	}
}

export default Tooth;