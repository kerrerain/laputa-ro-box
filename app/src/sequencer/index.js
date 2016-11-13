class Sequencer {
	constructor() {
		this.score = [];
		this.scoreIndex = 0;
		this.tempo = 80;
		this.tic = 400; //(60 / this.tempo) / 4; // 16th
		this.playing = false;
		this.loop = true;
		this.noteEventCallbacks = [];
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

		let note = this.score[this.scoreIndex];

		window.setTimeout(() => {
			if (this.playing) {
				this.dispatchNoteEvent(note);
				this.playNextNote();
			}
		}, note.t * this.tic);

		this.scoreIndex += 1;
	}

	dispatchNoteEvent(note) {
		this.noteEventCallbacks.forEach(cb => {
			cb(note);
		});
	}

	onNoteEvent(cb) {
		this.noteEventCallbacks.push(cb);
	}
}

export default Sequencer;