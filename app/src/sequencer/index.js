import Synthesizer from '../synthesizer';

class Sequencer {
	constructor() {
		this.score = [];
		this.scoreIndex = 0;
		this.tempo = 80;
		this.tic = 400; //(60 / this.tempo) / 4; // 16th
		this.synthesizer = new Synthesizer();
		this.playing = false;
		this.loop = true;
	}

	load(score) {
		this.score = score;
		this.scoreIndex = 0;
	}

	play() {
		if (!this.playing) {
			this.playing = true;
			this.scoreIndex = 0;
			this.playNextNote();
		}
	}

	stop() {
		this.scoreIndex = 0;
		this.playing = false;
	}

	playNextNote() {
		if (this.scoreIndex >= this.score.length) {
			this.scoreIndex = 0;

			if (!this.loop) {
				this.playing = false;
				return;
			}
		}

		let nextNote = this.score[this.scoreIndex];

		window.setTimeout(() => {
			if (this.playing) {
				this.synthesizer.triggerNote(nextNote.n, 0.5, 0);
				this.playNextNote();
			}
		}, nextNote.t * this.tic);

		this.scoreIndex += 1;
	}
}

export default Sequencer;