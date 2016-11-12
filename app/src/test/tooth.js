class Tooth {
	constructor() {
		this.width = 6;
		this.length = 50;
		this.offset = this.width / 2;
		this.twistX = 0;
		this.twistZ = 0;
		
		this.originMouseX = 0;
		this.originMouseZ = 0;
		this.absTwistZ = 0;

		this.K = 0.90; // Spring constant
		this.M = 0.5; // Mass
		this.D = 0.90; // Damping between 0 and 1
		this.restoringForce = 0;
		this.acceleration = 0;
		this.velocity = 0;
		
		this.gain = 0;
	}

	display(processing) {
		processing.background(200);
		processing.scale(2);
		processing.pushMatrix();

		processing.text("acceleration: " + this.acceleration.toFixed(2), 15, 15);
		processing.text("velocity: " + this.velocity.toFixed(2), 15, 30);
		processing.text("twistX: " + this.twistX.toFixed(2), 15, 45);

		processing.text("K: " + this.K, 15, 80);
		processing.text("M: " + this.M, 15, 95);
		processing.text("D: " + this.D, 15, 110);

		processing.translate(200 / 2, 70);
		processing.strokeWeight(1);

		// Center the shape
		processing.translate(-this.offset, 0);

		this.restoringForce = -this.K * this.twistX;
		this.acceleration = this.restoringForce / this.M;
		this.velocity = this.D * (this.velocity + this.acceleration);
		this.twistX = this.twistX + this.velocity;

		if (Math.abs(this.velocity) < 0.1 && Math.abs(this.acceleration) < 0.1) {
			this.restoringForce = 0;
			this.acceleration = 0;
			this.velocity = 0;
			this.twistX = 0;
			this.maxTwistX = 0;
		}

		this.absTwistZ = Math.abs(this.twistZ) / 5;

		processing.beginShape();
		processing.vertex(0, 0);
		processing.bezierVertex(0,
			this.length / 4 + this.absTwistZ,
			0, this.length / 1.5 + this.absTwistZ,
			0 - this.twistX - this.absTwistZ,
			this.length + this.absTwistZ);
		processing.vertex(this.width - this.twistX + this.absTwistZ,
			this.length + this.absTwistZ);
		processing.bezierVertex(this.width, this.length / 1.5 + this.absTwistZ,
			this.width, this.length / 4 + this.absTwistZ,
			this.width, 0);
		processing.vertex(0, 0);
		processing.endShape();
		processing.popMatrix();
	}
}

export default Tooth;