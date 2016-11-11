class Neck {
  display(processing) {
    processing.rectMode(processing.CENTER);
    processing.rect(0, 90, 15, 20);
  }
}

class Torso {
  display(processing) {
    processing.beginShape();
    processing.vertex(-80, 110);
    processing.bezierVertex(-70, 100, 70, 100, 80, 110);
    processing.bezierVertex(80, 110, 100, 120, 70, 250);
    processing.vertex(-70, 250);
    processing.bezierVertex(-100, 120, -80, 110, -80, 110);
    processing.endShape();
  }
}

class LeftArm {
  display(processing) {
    // Shoulder
    processing.rectMode(processing.CENTER);
    processing.rect(-100, 125, 40, 20);
    processing.ellipse(-110, 125, 40, 40);
    // Thorns
    processing.beginShape();

    processing.endShape();
    // Arm
    processing.beginShape();
    processing.vertex(-130, 116);
    processing.bezierVertex(-140, 115, -155, 125, -155, 185);
    processing.bezierVertex(-150, 190, -120, 190, -110, 185);
    processing.vertex(-110, 145);
    processing.bezierVertex(-115, 145, -135, 145, -130, 116);
    processing.endShape();
  }
}

class RightArm {
  display(processing) {
    // Shoulder
    processing.rectMode(processing.CENTER);
    processing.rect(100, 125, 40, 20);
    processing.ellipse(110, 125, 40, 40);
    // Thorns
    processing.beginShape();

    processing.endShape();
    // Arm
    processing.beginShape();
    processing.vertex(130, 116);
    processing.bezierVertex(140, 115, 155, 125, 155, 185);
    processing.bezierVertex(150, 190, 120, 190, 110, 185);
    processing.vertex(110, 145);
    processing.bezierVertex(115, 145, 135, 145, 130, 116);
    processing.endShape();
  }
}

class Head {
  display(processing) {
    processing.beginShape(processing);

    // TODO replace this by vertex
    processing.arc(0, 60, 60, 80, -processing.PI, 0);
    processing.line(-30, 60, -30, 80);
    processing.line(-30, 80, 30, 80);
    processing.line(30, 80, 30, 60);

    processing.endShape();

    processing.fill(255);
  }
}

class Body {
  constructor() {
    this.parts = [new Neck(), new LeftArm(), new RightArm(), new Torso(), new Head()];
  }

  display(processing) {
    this.parts.forEach(function(part) {
      part.display(processing);
    });
  }
}

export default Body;