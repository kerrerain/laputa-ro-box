import audioContext from './audio-context';

class Carrier {
	constructor() {
		this.gain = audioContext.createGain();
		this.gain.gain.value = 1;
		this.osc = audioContext.createOscillator();
		this.osc.type = 'sine';
		this.osc.frequency.value = 440;
		this.osc.connect(this.gain);
		this.osc.start(0);
	}
}

class Modulator {
	constructor() {
		this.gain = audioContext.createGain();
		this.gain.gain.value = 1;
		this.osc = audioContext.createOscillator();
		this.osc.type = 'triangle';
		this.osc.frequency.value = 800;
		this.osc.connect(this.gain);
		this.osc.start(0);
	}
}

class SoundPlayer {
	constructor() {
		this.destination = audioContext.createGain();
		this.destination.gain.value = 0;
		this.destination.connect(audioContext.destination);

		// FM Synthesis

		let carrier = new Carrier();
		let modulator = new Modulator();

		modulator.gain.connect(carrier.osc.frequency);
		carrier.gain.connect(this.destination);
	}
}

export default SoundPlayer;