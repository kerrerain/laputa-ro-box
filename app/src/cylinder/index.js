class Cylinder {
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
	}
}

export default Cylinder;