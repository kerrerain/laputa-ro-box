import audioContext from './audio-context';

class Voice {
	constructor() {
		this.gainNode = audioContext.createGain();
		this.gainNode.gain.value = 0;
		this.osc = audioContext.createOscillator();
		this.osc.type = 'sine';
		this.osc.frequency.value = 440;
		this.osc.connect(this.gainNode);
		this.osc.start(0);
	}
}

export default Voice;