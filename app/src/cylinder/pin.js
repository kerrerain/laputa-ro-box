class Pin {
	constructor(options, positionX) {
		this.x = positionX;
		this.angle = 0;
		this.height = options.cylinder.pinHeight;
	}

	display(processing) {
		var factor = processing.cos(this.angle) * (25 + this.height - 1); // radius + spike height
		processing.ellipse(this.x, 155 - factor, 2 * Math.abs(processing.sin(this.angle)) +
			this.height,
			2 * Math.abs(processing.sin(this.angle)) + this.height);
	}
}

export default Pin;