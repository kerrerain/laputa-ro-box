import audioContext from './audio-context';
import frequencies from './frequencies';
import Voice from './voice';

class Synthesizer {
	constructor() {
		this.destination = audioContext.createGain();
		this.destination.gain.value = 1;
		this.destination.connect(audioContext.destination);

		this.activeVoices = {};
	}

	triggerNote(name, duration) {
		if (this.activeVoices[name]) {
			this.activeVoices[name].osc.stop();
			delete this.activeVoices[name];
		}

		let voice = new Voice(frequencies[name]);
		this.activeVoices[name] = voice;

		voice.gainNode.connect(this.destination);
		voice.gainNode.gain.cancelScheduledValues(0);
		// Time in seconds
		voice.gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
		voice.gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
	}
}

export default Synthesizer;