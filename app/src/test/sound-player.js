class SoundPlayer {
	constructor() {
		let audioContext = this.createAudioContext();

		this.gain = audioContext.createGain();
		this.gain.gain.value = 0;
		this.gain.connect(audioContext.destination);

		let osc = audioContext.createOscillator();
		osc.type = 'sine';
		osc.frequency.value = 440;
		osc.detune.value = 0;
		osc.connect(this.gain);
		osc.start(0);
	}

	createAudioContext() {
		if (window.AudioContext) {
			return new window.AudioContext();
		} else {
			return new window.webkitAudioContext();
		}
	}
}

export default SoundPlayer;