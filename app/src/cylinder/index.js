import Pin from './pin';

class Cylinder {
	constructor(options, notes) {
		this.options = options;
		this.notes = notes;
		this.pinsBuffer = [];
		this.offsetX = -1 * this.notes.length * this.options.tooth.width / 2;
	}

	display(processing) {
		// Tube
		processing.rectMode(processing.CENTER);
		processing.rect(0, 155, 150, 20);
		// Cylinder
		processing.beginShape();
		processing.vertex(-50, 130);
		processing.bezierVertex(-60, 110, -60, 200, -50, 180);
		processing.vertex(50, 180);
		processing.bezierVertex(60, 200, 60, 110, 50, 130);
		processing.vertex(-50, 130);
		processing.endShape();

		processing.translate(this.offsetX, 0);
		this.displayPinsBuffer(processing);
		// Reset translation
		processing.translate(0, 0);
	}

	triggerNoteAnimation(note) {
		let pinPositionX = this.notes.indexOf(note) * this.options.tooth.width +
			(0.5 * this.options.tooth.width);
		this.pinsBuffer.push(new Pin(this.options, pinPositionX));
	}

	displayPinsBuffer(processing) {
		this.pinsBuffer.forEach(pin => {
			pin.angle += this.options.cylinder.rotationSpeed;
			pin.display(processing);
		});
		// Filter notes that are no longer visible
		this.pinsBuffer = this.pinsBuffer.filter(pin => {
			return pin.angle <= processing.PI;
		});
	}
}

export default Cylinder;