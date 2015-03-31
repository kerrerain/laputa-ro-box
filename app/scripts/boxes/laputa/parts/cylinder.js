module.exports = function () {
  'use strict';
  function Cylinder(processing) {

    var notes = [];
    var height = 50;
    var center = 0;
    var rotation = 0;
    var rotationSpeed = 0.01; //radian

    this.display = function () {
      render();
      // Random note generation (1%)
      if (Math.random() * 100 > 95) {
        notes.push(new CylinderNote(processing));
      }
      updateNotes();
      rotate();
    };

    function render() {
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

    function rotate() {
      rotation += rotationSpeed;
      if (rotation > 2 * processing.PI) {
        rotation = rotation - 2 * processing.PI;
      }
    }

    function updateNotes() {
      notes.forEach(function (note) {
        note.angle += rotationSpeed;
        note.display();
      });
      // Filter notes that are no longer visible
      notes = notes.filter(function (note) {
        return note.angle <= processing.PI;
      });
    }
  }

  function CylinderNote(processing) {

    this.angle = 0;

    var x = Math.floor(processing.random(-28, 28));

    var spikeHeight = 2;

    this.display = function () {
      var factor = processing.cos(this.angle) * (25 + spikeHeight - 1); // radius + spike height
      processing.ellipse(x, 155 - factor, 2 * Math.abs(processing.sin(this.angle)) + spikeHeight, 2 * Math.abs(processing.sin(this.angle)) + spikeHeight);
    };
  }

  return Cylinder;

};
