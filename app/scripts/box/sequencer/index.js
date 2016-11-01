(function() {
  'use strict';

  module.exports = Sequencer;

  function Sequencer() {
    this.score = {
      notes: [],
      endTime: 0
    };

    this.time = 0;
  }

  function duplicateNotes(notes) {
    return notes.slice(0);
  }

  function computeEndTime(notes) {
    return notes.map(function(note) {
        return note.time;
      })
      .reduce(function(previousTime, currentTime) {
        return Math.max(previousTime, currentTime);
      });
  }

  Sequencer.prototype.load = function(notes) {
    this.score = {
      notes: duplicateNotes(notes),
      endTime: computeEndTime(notes)
    };
  };

  Sequencer.prototype.forward = function(timeToAdd) {
    var self = this;
    var previousTime = self.time;

    self.time += timeToAdd;

    if (self.time > self.score.endTime) {
      self.time = 0;
    }

    return self.score.notes.filter(function(note) {
      return note.time >= previousTime && note.time < self.time;
    });
  };
})();