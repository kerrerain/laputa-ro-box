import Body from './body';
import Comb from '../comb';
import Cylinder from '../cylinder';
import Sequencer from '../sequencer';
import Synthesizer from '../synthesizer';
import score from '../scores/melody';
import _ from 'lodash';

let options = {
	scale: 1,
	width: 400,
	height: 200,
	backgroundColor: 200,
	tooth: {
		width: 4,
		length: 50
	},
	oscillator: {
		gamma: 0.02,
		omega1: 15,
		amplitude: 3,
		// TODO compute the end time from the parameters.
		timeOfVibrationEnd: 100
	}
};

let order = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// Assuming note = 'A3' or 'B#6' for example
let noteWeight = note => {
	return order.indexOf(note[0]) + note.length + (Number(note[note.length - 1]) * order.length);
};

let gatherNotesFromScore = score => {
	let notesSet = {};

	score.forEach(note => {
		notesSet[note.n] = true;
		console.log(note.n, noteWeight(note.n));
	});

	return Object.keys(notesSet).sort((a, b) => {
		return noteWeight(a) - noteWeight(b);
	});
};

class Box {
	constructor(customOptions) {
		// Mechanism
		this.body = new Body(options);
		this.comb = new Comb(options, gatherNotesFromScore(score));
		this.cylinder = new Cylinder(options);

		// Music
		this.synthesizer = new Synthesizer();
		this.sequencer = new Sequencer();
		this.sequencer.load(score);
		this.sequencer.onNoteEvent(note => {
			this.comb.triggerNoteAnimation(note.n);
			this.synthesizer.playNote(note.n, 1, 0.5);
		});

		_.assign(options, customOptions);

		this.draw = this.setup();
	}

	setup() {
		return processing => {
			processing.setup = () => {
				processing.size(options.width * options.scale,
					options.height * options.scale);
			};

			processing.draw = () => {
				processing.background(options.backgroundColor);
				processing.scale(options.scale);
				//
				processing.pushMatrix();
				// Translate
				processing.translate(options.width / 2, 0);

				this.body.display(processing);
				this.cylinder.display(processing);
				this.comb.display(processing);

				processing.popMatrix();
			};
		};
	}
}

export default Box;