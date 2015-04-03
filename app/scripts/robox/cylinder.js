module.exports = function () {
  'use strict';
  function Cylinder(drawer) {
    this.drawer = drawer;
    this.notes = [];
    this.rotationSpeed = 0.01; //radian
  }
  Cylinder.prototype.registerTeeth = function(teeth) {
    this.teeth = teeth;
  };
  Cylinder.prototype.draw = function(processing) {

  };

  Cylinder.prototype.updateNotes = function() {
    var self = this;

    self.notes.forEach(function (note) {
      note.angle += self.rotationSpeed;
      note.display();
    });
    // Filter notes that are no longer visible
    self.notes = self.notes.filter(function (note) {
      return note.angle <= self.processing.PI;
    });
  };

  Cylinder.prototype.render = function() {};

  Cylinder.prototype.display = function() {
    this.render();
    this.updateNotes();
  };

  Cylinder.prototype.onNoteEvent = function(note) {
    this.notes.push(note);
  };

  return Cylinder;
};
