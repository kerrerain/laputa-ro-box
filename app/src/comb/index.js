import Tooth from './tooth';

class Comb {
	constructor(options, notes) {
		this.options = options;
		this.notes = notes;
		this.teeth = this.setupTeeth(options, notes);
	}

	setupTeeth(options, notes) {
		var teeth = [];

		notes.forEach((note, index) => {
			teeth.push(new Tooth(options, index * options.tooth.width, note));
		});

		return teeth;
	}

	display(processing) {
		var x1 = -50;
		var x2 = 50;
		var y1 = 0;
		var y2 = 35;
		var height = y2 - y1;

		processing.translate(0, 75);
		processing.pushMatrix();
		processing.beginShape();
		processing.vertex(x1, y1);
		processing.bezierVertex(x1 - 15, y1 - (height - 5), x1, y1 - height, x1, y1 - height);
		processing.bezierVertex((x2 - x1) / 2, (y2 - y1) / 2, x2 + 5, y1 - (height - 5), x2 + 5, y1 - (height - 5));
		processing.bezierVertex(x2 + 15, y2 - 5, x2 + 15, y2 - (height - 5), x2, y2);
		processing.vertex(x2, y2 + 5);
		processing.vertex(x1, y2 + 5);
		processing.vertex(x1, y1);
		processing.endShape();
		processing.popMatrix();

		// Eyes
		processing.ellipse(x1 + 15, y1 - (height / 2) + 5, 15, 15);
		processing.ellipse(x2 - 15, y2 - (height / 2), 10, 10);

		// Reset translation
		processing.translate(0, 0);

		this.displayTeeth(processing);
	}

	displayTeeth(processing) {
		this.teeth.forEach(tooth => {
			tooth.display(processing);
		});
	}

	triggerNoteAnimation(note) {
		let teethToAnimate = this.teeth.filter(tooth => {
			return tooth.note === note;
		});
		teethToAnimate.forEach(tooth => {
			tooth.triggerAnimation();
		});
	}
}

export default Comb;