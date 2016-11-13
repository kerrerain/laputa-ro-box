import Body from './body';
import Comb from '../comb';
import Cylinder from '../cylinder';
import Sequencer from '../sequencer';
import Synthesizer from '../synthesizer';
import score from '../scores/melody';
import notes from './notes';
import _ from 'lodash';

let options = {
	scale: 1,
	width: 400,
	height: 200,
	backgroundColor: 200,
	tooth: {
		width: 5,
		length: 55
	},
	oscillator: {
		gamma: 0.02,
		omega1: 15,
		amplitude: 3,
		// TODO compute the end time from the parameters.
		timeOfVibrationEnd: 100
	},
	cylinder: {
		rotationSpeed: 0.015, //radian
		pinHeight: 3
	}
};

class Box {
	constructor(customOptions) {
		// Analysis of the score to find how many notes should be displayed
		let notesToDisplay = notes(score);

		// Parts
		this.body = new Body(options);
		this.comb = new Comb(options, notesToDisplay);
		this.cylinder = new Cylinder(options, notesToDisplay);

		// Music & animation
		this.synthesizer = new Synthesizer();
		this.sequencer = new Sequencer();
		this.sequencer.load(score);
		this.sequencer.onNoteEvent(note => {
			this.comb.triggerNoteAnimation(note.n);
			this.cylinder.triggerNoteAnimation(note.n);
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