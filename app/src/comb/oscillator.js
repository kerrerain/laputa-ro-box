class Oscillator {
	constructor(options) {
		this.options = options;
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
			this.position = this.computePosition(this.timeOfVibration);
		}

		if (this.timeOfVibration > this.options.oscillator.timeOfVibrationEnd) {
			this.vibrating = false;
			this.timeOfVibration = 0;
			this.position = 0;
		}

		return this.position;
	}

	computePosition(t) {
		// Equation of a damped harmonic oscillator
		return Math.exp(-this.options.oscillator.gamma * t) *
			this.options.oscillator.amplitude *
			Math.cos(this.options.oscillator.omega1 * t);
	}
}

export default Oscillator;