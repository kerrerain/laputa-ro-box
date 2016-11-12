const gamma = 0.02;
const a = 5;
const omega1 = 10;
// TODO compute the end time from the parameters.
const timeOfVibrationEnd = 100;

class Tooth {
	constructor() {
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

		if (this.vibrating) {
			this.timeOfVibration += 1;
			// Equation for a damped harmonic oscillator
			this.x = Math.exp(-gamma * this.timeOfVibration) * a * Math.cos(omega1 * this.timeOfVibration);
		}

		if (this.timeOfVibration > timeOfVibrationEnd) {
			this.vibrating = false;
			this.timeOfVibration = 0;
			this.x = 0;
			this.gain = 0;
		}

		this.absTwistZ = Math.abs(this.z) / 5;

		processing.beginShape();
		processing.vertex(0, 0);
		processing.bezierVertex(0,
			this.length / 4 + this.absTwistZ,
			0, this.length / 1.5 + this.absTwistZ,
			0 - this.x - this.absTwistZ,
			this.length + this.absTwistZ);
		processing.vertex(this.width - this.x + this.absTwistZ,
			this.length + this.absTwistZ);
		processing.bezierVertex(this.width, this.length / 1.5 + this.absTwistZ,
			this.width, this.length / 4 + this.absTwistZ,
			this.width, 0);
		processing.vertex(0, 0);
		processing.endShape();
		processing.popMatrix();
	}

	mousePressed(processing) {
		this.originMouseX = processing.mouseX;
		this.originMouseZ = processing.mouseY;
	}

	mouseReleased() {
		this.originMouseX = 0;
		this.originMouseZ = 0;
		this.vibrating = true;
		this.timeOfVibration = 0;
		this.z = 0;
	}

	mouseDragged(processing) {
		this.z = (processing.mouseY - this.originMouseZ) / 15;
	}
}

export default Tooth;