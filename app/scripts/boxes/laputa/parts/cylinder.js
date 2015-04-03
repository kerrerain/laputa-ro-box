module.exports = function () {
  'use strict';

  function Cylinder() {
    this.notes = [];
    this.rotationSpeed = 0.01; //radian
    this.height = 50;
    this.center = 0;
    this.teeth = null;
  }

  function CylinderNote(positionX) {
    this.x = positionX;
    this.angle = 0;
    this.spikeHeight = 2;
  }

  CylinderNote.prototype.display = function(processing) {
      var factor = processing.cos(this.angle) * (25 + this.spikeHeight - 1); // radius + spike height
      processing.ellipse(this.x, 155 - factor, 2 * Math.abs(processing.sin(this.angle)) + this.spikeHeight,
        2 * Math.abs(processing.sin(this.angle)) + this.spikeHeight);
  };

  Cylinder.prototype.render = function(processing) {
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
  };

  Cylinder.prototype.updateNotes = function(processing) {
    var self = this;

    self.notes.forEach(function (note) {
      note.angle += self.rotationSpeed;
      note.display(processing);
    });
    // Filter notes that are no longer visible
    self.notes = self.notes.filter(function (note) {
      return note.angle <= processing.PI;
    });
  };

  Cylinder.prototype.display = function(processing) {
    this.render(processing);
    this.updateNotes(processing);
  };

  Cylinder.prototype.onNoteEvent = function(note) {
    this.notes.push(new CylinderNote(this.teeth.getToothPositionX(note.position)));
  };

  return Cylinder;

};
