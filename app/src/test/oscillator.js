const gamma = 0.02;
const a = 5;
const omega1 = 10;
// TODO compute the end time from the parameters.
const timeOfVibrationEnd = 100;

class Oscillator {
	constructor() {
		this.position = 0;
		this.vibrating = false;
		this.timeOfVibration = 0;
	}

	triggerVibration() {
		this.vibrating = true;
		this.timeOfVibration = 0;
	}

	run(time) {
		if (this.vibrating) {
			this.timeOfVibration += time;
			// Equation for a damped harmonic oscillator
			this.position = this.computePosition(this.timeOfVibration);
		}

		if (this.timeOfVibration > timeOfVibrationEnd) {
			this.vibrating = false;
			this.timeOfVibration = 0;
			this.position = 0;
		}

		return this.position;
	}

	computePosition(t) {
		return Math.exp(-gamma * t) * a * Math.cos(omega1 * t);
	}
}

export default Oscillator;