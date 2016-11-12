import audioContext from './audio-context';
import frequencies from './frequencies';
import Voice from './voice';

class Synthesizer {
	constructor() {
		this.destination = audioContext.createGain();
		this.destination.gain.value = 1;
		this.destination.connect(audioContext.destination);

		this.voice = new Voice();
		this.voice.gainNode.connect(this.destination);
	}

	triggerNote(name, duration) {
		this.voice.osc.frequency.value = frequencies[name];
		this.voice.gainNode.gain.cancelScheduledValues(0);
		// Time in seconds
		this.voice.gainNode.gain.setValueAtTime(1, audioContext.currentTime);
		this.voice.gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.5);
	}
}

export default Synthesizer;